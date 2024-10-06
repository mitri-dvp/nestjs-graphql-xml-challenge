import { Module } from '@nestjs/common';
import { VehicleService } from '@src/vehicle/vehicle.service';
import { VechileController } from '@src/vehicle/vehicle.controller';
import { HttpModule } from '@nestjs/axios';
import { DatabaseModule } from '@src/database/database.module';

@Module({
  imports: [HttpModule, DatabaseModule],
  controllers: [VechileController],
  providers: [VehicleService],
})
export class VehicleModule {}
