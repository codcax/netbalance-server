import { Factory, Faker } from '@mikro-orm/seeder';
import { Plan } from '@modules/plans/plan.entity';

export class PlanFactory extends Factory<Plan> {
  model = Plan;

  definition(faker: Faker): Partial<Plan> {
    return {};
  }
}
