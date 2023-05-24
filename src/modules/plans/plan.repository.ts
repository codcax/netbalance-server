import { EntityRepository } from '@mikro-orm/postgresql';
import { Plan } from './plan.entity';

export class PlanRepository extends EntityRepository<Plan> {}
