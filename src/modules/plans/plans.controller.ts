import { Controller, Get } from '@nestjs/common';
import { PlansService } from './plans.service';
import { Plan } from './plan.entity';

@Controller('plans')
export class PlansController {
  constructor(private readonly planService: PlansService) {}
  @Get()
  async findAll(): Promise<Plan[]> {
    return this.planService.fetchAll();
  }
}
