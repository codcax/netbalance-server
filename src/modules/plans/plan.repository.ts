import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Plan } from './plan.entity';

@Injectable()
export class PlanRepository extends EntityRepository<Plan> {}
