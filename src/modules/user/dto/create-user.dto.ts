import {
  IsAlphanumeric,
  IsAscii,
  IsEmail,
  IsNotEmpty,
  MinLength,
} from 'class-validator';
import { BannedUsernames } from '@constants/banned-words';
import { DoesNotContainBannedWords } from '@shared/validators/banned-words.validator';
import { BannedEmails } from '@constants/banned-emails';

export class CreateUserDto {
  @IsNotEmpty()
  @DoesNotContainBannedWords(BannedUsernames)
  @IsAlphanumeric()
  @MinLength(4)
  readonly username: string;

  @IsNotEmpty()
  @DoesNotContainBannedWords(BannedEmails)
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsAscii()
  @MinLength(8)
  readonly password: string;
}
