import { Test, TestingModule } from '@nestjs/testing';
import { PlansController } from './plans.controller';
import { PlansService } from './plans.service';
import { FreePlan, BasicPlan, ProPlan } from '@data/plan';
import { Plan } from './plan.entity';

describe('PlansController', () => {
  let controller: PlansController;
  let service: PlansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlansController],
      providers: [
        {
          provide: PlansService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PlansController>(PlansController);
    service = module.get<PlansService>(PlansService);
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
