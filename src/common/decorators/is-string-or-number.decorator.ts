import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from "class-validator";

/**
 * Decorador personalizado que valida si un valor es string o number
 * @param validationOptions - Opciones de validación
 */
export function IsStringOrNumber(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: "isStringOrNumber",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          // Retorna true si es string o number
          return typeof value === "string" || typeof value === "number";
        },
        defaultMessage(args: ValidationArguments) {
          // Mensaje de error personalizado
          return `${args.property} must be a string or a number`;
        },
      },
    });
  };
}
