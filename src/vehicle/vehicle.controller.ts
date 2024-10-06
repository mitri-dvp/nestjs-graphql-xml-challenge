import { Controller, Get } from '@nestjs/common';
import { VehicleService } from '@src/vehicle/vehicle.service';
import { Result } from '@src/types';

@Controller('vehicles')
export class VechileController {
  constructor(private readonly vechileService: VehicleService) {}

  @Get()
  getVehicles(): Promise<Result[]> {
    return this.vechileService.getVehicles();
  }
}
