import { Plan } from '@modules/plans/plan.entity';

enum PlanType {
  FREE = 'FREE',
  BASIC = 'BASIC',
  PRO = 'PRO',
}

export const FreePlan: Plan = {
  id: 1,
  name: PlanType.FREE,
  price: 0,
  wallet_limit: 2,
  budget_limit: 4,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const BasicPlan = {
  id: 2,
  name: PlanType.BASIC,
  price: 19.0,
  wallet_limit: 4,
  budget_limit: 8,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const ProPlan = {
  id: 3,
  name: PlanType.PRO,
  price: 29.0,
  wallet_limit: 0,
  budget_limit: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default PlanType;
