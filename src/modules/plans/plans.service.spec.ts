import { Test, TestingModule } from '@nestjs/testing';
import { PlansService } from './plans.service';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Plan } from './plan.entity';
import { EntityRepository } from '@mikro-orm/core';

describe('PlansService', () => {
  let service: PlansService;
  let repository: EntityRepository<Plan>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlansService,
        {
          provide: getRepositoryToken(Plan),
          useValue: {
            findAll: jest.fn(),
            findOneOrFail: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PlansService>(PlansService);
    repository = module.get<EntityRepository<Plan>>(getRepositoryToken(Plan));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('plan repository should be defined', () => {
    expect(repository).toBeDefined();
  });
});
