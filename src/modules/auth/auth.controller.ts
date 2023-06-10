import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { User } from '@modules/users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('signup')
  async signup(@Body() data: SignUpDto): Promise<User> {}
}
