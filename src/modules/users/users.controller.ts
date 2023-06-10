import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.findOne(id);
  }
}
