import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';

describe('UserController', () => {
  let controller: UserController;

  const mockUser: User = new User('test', 'test@test.com', 'testpassword');

  const mockUserService = {
    findOne: jest.fn().mockImplementation((options) => {
      return Promise.resolve(mockUser);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const result = await controller.findOne(1);
      expect(result).toEqual(mockUser);
    });
  });
});
