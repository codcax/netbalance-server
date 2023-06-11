import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { BasicPlan, FreePlan, ProPlan } from '@constants/plan';
import { Plan } from '@modules/plans/plan.entity';

export class PlanSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const defaultPlans = [FreePlan, BasicPlan, ProPlan];
    for (const planData of defaultPlans) {
      const existingPlan = await em.findOne(Plan, { name: planData.name });

      if (!existingPlan) {
        const plan = em.create(Plan, planData);
        await em.persistAndFlush(plan);
      }
    }
  }
}
