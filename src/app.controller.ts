import { Controller, Get } from '@nestjs/common';
import { AppService, Result } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getVehicles(): Promise<Result[]> {
    return this.appService.getVehicles();
  }
}
