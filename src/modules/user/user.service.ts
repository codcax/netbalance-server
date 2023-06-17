import { InjectRepository } from '@mikro-orm/nestjs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly entityManager: EntityManager,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ id: id });
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email: email });
  }

  async createOne(data: CreateUserDto): Promise<User> {
    const { username, email, password } = data;

    const existingUser = await this.userRepository.findOne({ email: email });

    if (existingUser) {
      throw new BadRequestException({
        message: 'Email is already taken.',
      });
    }

    const user = new User(username, email, password);

    await this.entityManager.persistAndFlush(user);

    return user;
  }
}
