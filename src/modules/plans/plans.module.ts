import { Module } from '@nestjs/common';
import { PlansController } from './plans.controller';
import { PlansService } from './plans.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Plan } from './plan.entity';
import { PlanRepository } from './plan.repository';

@Module({
  imports: [MikroOrmModule.forFeature([Plan])],
  controllers: [PlansController],
  providers: [PlansService, PlanRepository],
})
export class PlansModule {}
