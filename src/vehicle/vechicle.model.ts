import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType({ description: 'A vehicle make' })
export class VehicleMake {
  @Field(() => ID)
  makeId: number;

  @Field()
  makeName: string;

  @Field(() => [VehicleType])
  vehicleTypes: VehicleType[];
}

@ObjectType({ description: 'A vehicle type' })
export class VehicleType {
  @Field(() => ID)
  typeId: number;

  @Field()
  typeName: string;
}
