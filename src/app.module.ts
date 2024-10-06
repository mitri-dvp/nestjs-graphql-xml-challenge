import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { VehicleModule } from '@src/vehicle/vehicle.module';
import { XmlParserModule } from '@src/xml/xml.module';
import { DatabaseModule } from '@src/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    HttpModule,
    XmlParserModule,
    VehicleModule,
  ],
})
export class AppModule {}
