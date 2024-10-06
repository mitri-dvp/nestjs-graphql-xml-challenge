import { Query, Resolver } from '@nestjs/graphql';
import { VehicleService } from '@src/vehicle/vehicle.service';
import { Make } from './models/vechicle.model';

@Resolver((of) => Make)
export class VehiclesResolver {
  constructor(private readonly vehicleService: VehicleService) {}

  @Query((returns) => [Make])
  async vehicles(): Promise<Make[]> {
    const res = await this.vehicleService.getVehicles();
    return res.map((r) => ({
      makeId: r.makeId,
      makeName: r.makeName,
      makeTypes: r.vehicleTypes,
    }));
  }
}
