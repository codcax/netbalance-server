import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Plan } from './plan.entity';
import { EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(Plan)
    private readonly planRepository: EntityRepository<Plan>,
  ) {}
  async fetchAll(): Promise<Plan[]> {
    return this.planRepository.findAll();
  }
}
