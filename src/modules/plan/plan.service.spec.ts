import { Test, TestingModule } from '@nestjs/testing';
import { PlanService } from './plan.service';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Plan } from './plan.entity';
import { EntityRepository } from '@mikro-orm/core';

describe('PlanService', () => {
  let service: PlanService;
  let repository: EntityRepository<Plan>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlanService,
        {
          provide: getRepositoryToken(Plan),
          useValue: {
            findAll: jest.fn(),
            findOneOrFail: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PlanService>(PlanService);
    repository = module.get<EntityRepository<Plan>>(getRepositoryToken(Plan));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('plan repository should be defined', () => {
    expect(repository).toBeDefined();
  });
});
