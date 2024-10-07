import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { XmlParserService } from '@src/xml/xml.service';
import { VehicleMake } from '@src/vehicle/vechicle.model';
import { DatabaseService } from '@src/database/database.service';
import {
  AllVehicleMakes,
  VehicleTypesForMakeId,
} from '@src/vehicle/vehicle.interfaces';

@Injectable()
export class VehicleService {
  private readonly logger = new Logger(VehicleService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly xmlParserService: XmlParserService,
    private readonly databaseService: DatabaseService,
  ) {}

  async saveVehiclesToDatabase(vehicleMakes: VehicleMake[]) {
    const saveResult = async (vehicleMake: VehicleMake) => {
      return await this.databaseService.vehicleMake.upsert({
        create: {
          makeId: vehicleMake.makeId,
          makeName: String(vehicleMake.makeName),
          vehicleTypes: {
            connectOrCreate: vehicleMake.vehicleTypes.map((type) => {
              return {
                where: { typeId: type.typeId },
                create: { typeId: type.typeId, typeName: type.typeName },
              };
            }),
          },
        },
        update: {
          makeName: String(vehicleMake.makeName),
          vehicleTypes: {
            connectOrCreate: vehicleMake.vehicleTypes.map((type) => {
              return {
                where: { typeId: type.typeId },
                create: { typeId: type.typeId, typeName: type.typeName },
              };
            }),
          },
        },
        where: {
          makeId: vehicleMake.makeId,
        },
      });
    };

    await Promise.all(vehicleMakes.map(saveResult));
  }

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
  ): Promise<VehicleMake['vehicleTypes']> {
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

  async getVehicles(): Promise<VehicleMake[]> {
    const AllVehicleMakesXML = await this.getAllVehicleMakesXML();
    const AllVehicleMakesObject = this.xmlParserService.parse<AllVehicleMakes>(
      AllVehicleMakesXML.data,
    );

    const vehicleMakes: VehicleMake[] = await Promise.all(
      AllVehicleMakesObject.Response.Results.AllVehicleMakes.splice(0, 10).map(
        async (make) => {
          const vehicleTypes = await this.getVehicleTypesForMakeId(
            make.Make_ID,
          );

          return {
            makeId: make.Make_ID,
            makeName: String(make.Make_Name),
            vehicleTypes: vehicleTypes,
          } as VehicleMake;
        },
      ),
    );

    await this.saveVehiclesToDatabase(vehicleMakes);

    return vehicleMakes;
  }
}
