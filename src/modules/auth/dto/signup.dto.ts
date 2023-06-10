import {
  IsAlpha,
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  MinLength,
} from 'class-validator';
import { BannedUsernames } from '@data/banned-words';
import { DoesNotContainBannedWords } from '@shared/validators/banned-words.validator';

export class SignUpDto {
  @IsNotEmpty()
  @DoesNotContainBannedWords(BannedUsernames)
  @IsAlphanumeric()
  @MinLength(4)
  readonly username: string;

  @IsNotEmpty()
  @DoesNotContainBannedWords(BannedUsernames)
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(8)
  readonly password: string;

  @IsNotEmpty()
  @IsAlpha()
  @DoesNotContainBannedWords(BannedUsernames)
  @MinLength(2)
  readonly first_name: string;

  @IsNotEmpty()
  @IsAlpha()
  @DoesNotContainBannedWords(BannedUsernames)
  @MinLength(2)
  readonly last_name: string;
}
