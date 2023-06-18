import { Test, TestingModule } from '@nestjs/testing';
import { PlanService } from './plan.service';
import { FreePlan, BasicPlan, ProPlan } from '@constants/plan';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Plan } from './plan.entity';

describe('PlanService', () => {
  let service: PlanService;

  const mockPlanRepository = {
    findAll: jest.fn().mockImplementation(() => {
      return Promise.resolve([FreePlan, BasicPlan, ProPlan]);
    }),

    findOne: jest.fn().mockImplementation(() => {
      return Promise.resolve(FreePlan);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlanService,
        {
          provide: getRepositoryToken(Plan),
          useValue: mockPlanRepository,
        },
      ],
    }).compile();

    service = module.get<PlanService>(PlanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of plans', async () => {
      const result = await service.findAll();
      expect(result).toStrictEqual([FreePlan, BasicPlan, ProPlan]);
    });
  });

  describe('findOne', () => {
    it('should return a plan by id', async () => {
      const result = await service.findById(1);
      expect(result).toEqual(FreePlan);
    });
  });
});
