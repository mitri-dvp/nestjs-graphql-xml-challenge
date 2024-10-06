import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { VehicleModule } from '@src/vehicle/vehicle.module';
import { XmlParserModule } from './xml/xml.module';

@Module({
  imports: [HttpModule, XmlParserModule, VehicleModule],
})
export class AppModule {}
