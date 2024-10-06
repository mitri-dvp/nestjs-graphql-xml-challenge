import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { XmlParserService } from '@src/xml/xml.service';
import { AllVehicleMakes, Result, VehicleTypesForMakeId } from '@src/types';

@Injectable()
export class VehicleService {
  private readonly logger = new Logger(VehicleService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly xmlParserService: XmlParserService,
  ) {}

  async getAllVehicleMakesXML() {
    return await firstValueFrom(
      this.httpService
        .get('https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML')
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw new Error('Error fetching vehicle makes');
          }),
        ),
    );
  }

  async getVehicleTypeForMakeIdXML(makeId: number) {
    return await firstValueFrom(
      this.httpService
        .get(
          `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/${makeId}?format=xml`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw new Error(
              `Error fetching vehicle types for MakeId: ${makeId}`,
            );
          }),
        ),
    );
  }

  async getVehicleTypesForMakeId(
    makeId: number,
  ): Promise<Result['vehicleTypes']> {
    const VehicleTypesForMakeIdXML =
      await this.getVehicleTypeForMakeIdXML(makeId);

    const VehicleTypeForMakeIdObject =
      this.xmlParserService.parse<VehicleTypesForMakeId>(
        VehicleTypesForMakeIdXML.data,
      );

    let vehicleTypesForMakeIds =
      VehicleTypeForMakeIdObject.Response.Results.VehicleTypesForMakeIds;

    if (!Array.isArray(vehicleTypesForMakeIds)) {
      vehicleTypesForMakeIds = [vehicleTypesForMakeIds];
    }

    return vehicleTypesForMakeIds.map((type) => ({
      typeId: type.VehicleTypeId,
      typeName: type.VehicleTypeName,
    }));
  }

  async getVehicles(): Promise<Result[]> {
    const AllVehicleMakesXML = await this.getAllVehicleMakesXML();
    const AllVehicleMakesObject = this.xmlParserService.parse<AllVehicleMakes>(
      AllVehicleMakesXML.data,
    );

    const response: Result[] = await Promise.all(
      AllVehicleMakesObject.Response.Results.AllVehicleMakes.splice(0, 10).map(
        async (make) => {
          const vehicleTypes = await this.getVehicleTypesForMakeId(
            make.Make_ID,
          );

          return {
            makeId: make.Make_ID,
            makeName: make.Make_Name,
            vehicleTypes: vehicleTypes,
          };
        },
      ),
    );

    return response;
  }
}
