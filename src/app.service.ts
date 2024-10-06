import { Injectable, Logger } from '@nestjs/common';
import { XMLParser } from 'fast-xml-parser';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

// AllVehicleMakesResponse Types
interface AllVehicleMakes {
  Response: AllVehicleMakesResponse;
}

interface AllVehicleMakesResponse {
  Count: number;
  Message: string;
  Results: AllVehicleMakesResults;
}

interface AllVehicleMakesResults {
  AllVehicleMakes: AllVehicleMake[];
}

interface AllVehicleMake {
  Make_ID: number;
  Make_Name: number | string;
}

// VehicleTypesForMakeIdResponse Types
interface VehicleTypesForMakeId {
  Response: VehicleTypesForMakeIdResponse;
}

interface VehicleTypesForMakeIdResponse {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: VehicleTypesForMakeIdResults;
}

interface VehicleTypesForMakeIdResults {
  VehicleTypesForMakeIds: VehicleTypesForMakeId[];
}

interface VehicleTypesForMakeId {
  VehicleTypeId: number;
  VehicleTypeName: string;
}

// Expected Output Type
export interface Result {
  makeId: number;
  makeName: number | string;
  vehicleTypes: {
    typeId: number;
    typeName: string;
  }[];
}

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly httpService: HttpService) {}

  async getAllVehicleMakesXML() {
    return await firstValueFrom(
      this.httpService
        .get('https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML')
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
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
            throw 'An error happened!';
          }),
        ),
    );
  }

  async getVehicles(): Promise<Result[]> {
    const parser = new XMLParser();

    const { data: AllVehicleMakesXML } = await this.getAllVehicleMakesXML();

    const AllVehicleMakesObject: AllVehicleMakes =
      parser.parse(AllVehicleMakesXML);

    const response: Result[] = await Promise.all(
      AllVehicleMakesObject.Response.Results.AllVehicleMakes.splice(0, 10).map(
        async (make) => {
          const { data: VehicleTypesForMakeIdXML } =
            await this.getVehicleTypeForMakeIdXML(make.Make_ID);

          const VehicleTypeForMakeIdObject: VehicleTypesForMakeId =
            parser.parse(VehicleTypesForMakeIdXML);

          const vehicleTypes =
            VehicleTypeForMakeIdObject.Response.Results.VehicleTypesForMakeIds.map(
              (type) => {
                return {
                  typeId: type.VehicleTypeId,
                  typeName: type.VehicleTypeName,
                };
              },
            ) as Result['vehicleTypes'];

          return {
            makeId: make.Make_ID,
            makeName: make.Make_Name,
            vehicleTypes: vehicleTypes,
          };
        },
      ),
    );

    // Return the parsed object
    return response;
  }
}
