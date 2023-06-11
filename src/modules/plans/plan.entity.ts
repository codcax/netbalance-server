import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core';
import PlanType from '@constants/plan';
import { PlanRepository } from './plan.repository';

@Entity({ customRepository: () => PlanRepository })
export class Plan {
  @PrimaryKey()
  id!: number;

  @Enum(() => PlanType)
  name!: string;

  @Property({ nullable: false, default: 0 })
  price!: number;

  @Property({ nullable: false, default: 0 })
  wallet_limit!: number;

  @Property({ nullable: false, default: 0 })
  budget_limit!: number;

  @Property({ onCreate: () => new Date(), onUpdate: () => new Date() })
  createdAt: Date = new Date();

  @Property({ onCreate: () => new Date(), onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
