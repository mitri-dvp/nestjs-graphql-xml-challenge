import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType({ description: 'A vehicle make' })
export class Make {
  @Field((type) => ID)
  makeId: number;

  @Field()
  makeName: string;

  @Field((type) => [VehicleType])
  makeTypes: VehicleType[];
}

@ObjectType({ description: 'A vehicle type' })
export class VehicleType {
  @Field((type) => ID)
  typeId: number;

  @Field()
  typeName: string;
}
