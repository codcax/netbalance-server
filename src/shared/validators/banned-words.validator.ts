import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'bannedWords', async: false })
export class BannedWordsValidator implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments): boolean {
    if (!value) {
      return true;
    }
    const [bannedWords] = args.constraints;
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
  property: string[],
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'doesNotContainbannedWords',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: BannedWordsValidator,
    });
  };
}
