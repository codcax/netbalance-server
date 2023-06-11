import { Module } from '@nestjs/common';
import { PlanController } from './plan.controller';
import { PlanService } from './plan.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Plan } from './plan.entity';
import { PlanRepository } from './plan.repository';

@Module({
  imports: [MikroOrmModule.forFeature([Plan])],
  controllers: [PlanController],
  providers: [PlanService, PlanRepository],
})
export class PlanModule {}
