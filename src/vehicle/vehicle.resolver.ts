import { Query, Resolver } from '@nestjs/graphql';
import { VehicleService } from '@src/vehicle/vehicle.service';
import { VehicleMake } from '@src/vehicle/vechicle.model';

@Resolver((of) => VehicleMake)
export class VehiclesResolver {
  constructor(private readonly vehicleService: VehicleService) {}

  @Query((returns) => [VehicleMake])
  async vehicles(): Promise<VehicleMake[]> {
    const res = await this.vehicleService.getVehicles();
    return res.map((r) => ({
      makeId: r.makeId,
      makeName: r.makeName,
      vehicleTypes: r.vehicleTypes,
    }));
  }
}
