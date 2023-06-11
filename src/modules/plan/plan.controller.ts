import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PlanService } from './plan.service';
import { Plan } from './plan.entity';

@Controller('plans')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Get()
  async findAll(): Promise<Plan[]> {
    return this.planService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Plan> {
    return this.planService.findOne(id);
  }
}
