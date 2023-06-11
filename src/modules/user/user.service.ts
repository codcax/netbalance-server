import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOneOrFail({ id: id });
  }

  async createOne(user: User): Promise<User> {
    return this.userRepository.create(user);
  }
}
