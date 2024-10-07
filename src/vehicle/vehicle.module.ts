import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { VehicleService } from '@src/vehicle/vehicle.service';
import { VechileController } from '@src/vehicle/vehicle.controller';
import { DatabaseModule } from '@src/database/database.module';
import { VehiclesResolver } from '@src/vehicle/vehicle.resolver';

@Module({
  imports: [HttpModule, DatabaseModule],
  controllers: [VechileController],
  providers: [VehiclesResolver, VehicleService],
})
export class VehicleModule {}
