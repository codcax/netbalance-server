import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './user.entity';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { BadRequestException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;

  const mockEntityManager = {
    persistAndFlush: jest.fn().mockImplementation(() => {
      return Promise.resolve();
    }),
  };

  const mockUserRepository = {
    findAll: jest.fn().mockImplementation(() => {
      return Promise.resolve([]);
    }),

    findOne: jest.fn().mockImplementation((options) => {
      return Promise.resolve({
        id: 1 || options.id,
        email: 'test@test.com' || options.email,
        username: 'test' || options.username,
      });
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: EntityManager,
          useValue: mockEntityManager,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const result = await service.findAll();
      expect(result).toStrictEqual([]);
    });
  });

  describe('findById', () => {
    it('should return a user by id', async () => {
      const result = await service.findById(1);

      expect(result).toEqual({
        id: 1,
        email: 'test@test.com',
        username: 'test',
      });
    });
  });

  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      const result = await service.findByEmail('test@test.com');

      expect(result).toEqual({
        id: 1,
        email: 'test@test.com',
        username: 'test',
      });
    });
  });

  describe('createOne', () => {
    it('should create new user and return the user', async () => {
      // Mock user repository to return null for existing user.
      mockUserRepository.findOne.mockImplementationOnce(() => {
        return Promise.resolve();
      });

      const result = await service.createOne({
        email: 'newuser@test.com',
        password: 'newpassword',
        username: 'newusername',
      });

      expect(result).toEqual({
        email: 'newuser@test.com',
        password: 'newpassword',
        username: 'newusername',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
  });

  describe('createOne', () => {
    it('should throw exception error for existing user', async () => {
      await expect(() =>
        service.createOne({
          email: 'test@test.com',
          password: 'newpassword',
          username: 'newusername',
        }),
      ).rejects.toThrow(new BadRequestException('Email is already taken.'));
    });
  });
});
