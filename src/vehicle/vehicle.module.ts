import { Module } from '@nestjs/common';
import { VehicleService } from '@src/vehicle/vehicle.service';
import { VechileController } from '@src/vehicle/vehicle.controller';
import { HttpModule } from '@nestjs/axios';
import { DatabaseModule } from '@src/database/database.module';
import { VehiclesResolver } from './vehicle.resolver';

@Module({
  imports: [HttpModule, DatabaseModule],
  controllers: [VechileController],
  providers: [VehiclesResolver, VehicleService],
})
export class VehicleModule {}
