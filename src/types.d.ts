// AllVehicleMakesResponse Types
export interface AllVehicleMakes {
  Response: AllVehicleMakesResponse;
}

export interface AllVehicleMakesResponse {
  Count: number;
  Message: string;
  Results: AllVehicleMakesResults;
}

export interface AllVehicleMakesResults {
  AllVehicleMakes: AllVehicleMake[];
}

export interface AllVehicleMake {
  Make_ID: number;
  Make_Name: number | string;
}

// VehicleTypesForMakeIdResponse Types
export interface VehicleTypesForMakeId {
  Response: VehicleTypesForMakeIdResponse;
}

export interface VehicleTypesForMakeIdResponse {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: VehicleTypesForMakeIdResults;
}

export interface VehicleTypesForMakeIdResults {
  VehicleTypesForMakeIds: VehicleTypesForMakeId[] | VehicleTypesForMakeId;
}

export interface VehicleTypesForMakeId {
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
