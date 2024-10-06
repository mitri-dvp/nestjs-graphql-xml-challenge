
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface VehicleType {
    typeId: number;
    typeName: string;
}

export interface Make {
    makeId: number;
    makeName: string;
    vehicleTypes: VehicleType[];
}

export interface IQuery {
    vehicles(): Nullable<Make>[] | Promise<Nullable<Make>[]>;
}

type Nullable<T> = T | null;
