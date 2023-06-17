import { CreateUserDto } from '@modules/user/dto/create-user.dto';
import { MatchPassword } from '@shared/validators/match-password.validator';

export class SignUpDto extends CreateUserDto {
  @MatchPassword('password')
  readonly confirm_password: string;
}
