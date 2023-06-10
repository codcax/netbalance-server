import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'bannedWords', async: false })
export class bannedWordsValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): boolean {
    const [bannedWords] = args.constraints;
    if (!value || !bannedWords || !Array.isArray(bannedWords)) {
      return true;
    }

    for (const bannedWord of bannedWords) {
      if (value.includes(bannedWord)) {
        return false;
      }
    }

    return true;
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} cannot contain forbidden texts.`;
  }
}

export function DoesNotContainBannedWords(
  bannedWords: string[],
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'doesNotContainbannedWords',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [bannedWords],
      options: validationOptions,
      validator: bannedWordsValidator,
    });
  };
}
