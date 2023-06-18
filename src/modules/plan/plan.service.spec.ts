import { Test, TestingModule } from '@nestjs/testing';
import { PlanService } from './plan.service';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Plan } from './plan.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { FreePlan, BasicPlan, ProPlan } from '@constants/plan';

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

  describe('findAll', () => {
    it('should return an array of plans', async () => {
      const mockPlans: Plan[] = [FreePlan, BasicPlan, ProPlan];

      jest.spyOn(service, 'findAll').mockResolvedValue(mockPlans);

      const result = await service.findAll();

      expect(result).toEqual(mockPlans);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single plan', async () => {
      const mockPlan: Plan = FreePlan;

      jest.spyOn(service, 'findOne').mockResolvedValue(mockPlan);

      const result = await service.findOne(1);

      expect(result).toEqual(mockPlan);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });
});
