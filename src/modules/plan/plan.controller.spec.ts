import { Test, TestingModule } from '@nestjs/testing';
import { PlanController } from './plan.controller';
import { PlanService } from './plan.service';
import { FreePlan, BasicPlan, ProPlan } from 'src/constants/plan';
import { Plan } from './plan.entity';

describe('PlanController', () => {
  let controller: PlanController;
  let service: PlanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanController],
      providers: [
        {
          provide: PlanService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PlanController>(PlanController);
    service = module.get<PlanService>(PlanService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of plans', async () => {
      const mockPlans: Plan[] = [FreePlan, BasicPlan, ProPlan];

      jest.spyOn(service, 'findAll').mockResolvedValue(mockPlans);

      const result = await controller.findAll();

      expect(result).toEqual(mockPlans);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single plan', async () => {
      const mockPlan: Plan = FreePlan;

      jest.spyOn(service, 'findOne').mockResolvedValue(mockPlan);

      const result = await controller.findOne(1);

      expect(result).toEqual(mockPlan);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });
});
