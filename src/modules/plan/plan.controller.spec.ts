import { Test, TestingModule } from '@nestjs/testing';
import { PlanController } from './plan.controller';
import { PlanService } from './plan.service';
import { FreePlan, BasicPlan, ProPlan } from '@constants/plan';

describe('PlanController', () => {
  let controller: PlanController;

  const mockPlanService = {
    findAll: jest.fn().mockImplementation(() => {
      return Promise.resolve([FreePlan, BasicPlan, ProPlan]);
    }),

    findById: jest.fn().mockImplementation((id) => {
      const plans = [FreePlan, BasicPlan, ProPlan];
      const foundPlan = plans.find((plan) => plan.id === id);
      return Promise.resolve(foundPlan);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanController],
      providers: [
        {
          provide: PlanService,
          useValue: mockPlanService,
        },
      ],
    }).compile();

    controller = module.get<PlanController>(PlanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of plans', async () => {
      const result = await controller.findAll();
      expect(result).toStrictEqual([FreePlan, BasicPlan, ProPlan]);
    });
  });

  describe('findById', () => {
    it('should return a plan', async () => {
      const result = await controller.findOne(FreePlan.id);
      expect(result).toEqual(FreePlan);
    });
  });
});
