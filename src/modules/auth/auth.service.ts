import { Injectable } from '@nestjs/common';
import { UsersService } from '@modules/users/users.service';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async signUp(data: SignUpDto) {}
}
