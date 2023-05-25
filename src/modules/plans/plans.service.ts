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
  async findAll(): Promise<Plan[]> {
    return this.planRepository.findAll();
  }
  async findOne(id: number): Promise<Plan> {
    return this.planRepository.findOneOrFail({ id: id });
  }
}
