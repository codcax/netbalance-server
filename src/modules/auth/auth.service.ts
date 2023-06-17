import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { UserService } from '@modules/user/user.service';
import { User } from '@modules/user/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async createOne(data: SignUpDto): Promise<User> {
    const { username, email, password } = data;

    const user = await this.userService.createOne({
      username,
      email,
      password,
    });

    return user;
  }
}
