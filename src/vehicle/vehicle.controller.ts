import { Controller, Get } from '@nestjs/common';
import { VehicleService } from '@src/vehicle/vehicle.service';
import { VehicleMake } from '@src/vehicle/vechicle.model';

@Controller('vehicles')
export class VechileController {
  constructor(private readonly vechileService: VehicleService) {}

  @Get()
  getVehicles(): Promise<VehicleMake[]> {
    return this.vechileService.getVehicles();
  }
}
