import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { IsNumber, IsObject, IsOptional, IsString, ValidateIf, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { Optional } from "@nestjs/common";
import { SingupExtraTaggingDto } from "./singup-extra-tagging.dto";
import { IsStringOrNumber } from "@common/decorators/is-string-or-number.decorator";

@ApiSchema({
  description:
    "Estructura de datos para generar métrica al evento singup, permite recibir cualquier JSON",
})
export class SingupTaggingDto {
  @ApiProperty({
    example: "100",
    description: "Usuario que realiza la operación",
    required: true,
  })
  @IsStringOrNumber()
  user_id: string | number;

  @ApiProperty({
    example: "LVM",
    description: "Compañía a la que pertenece el usuario",
    required: false,
  })
  @Optional()
  @IsString()
  company?: string;

  @ApiProperty({
    example: "viventodev26",
    description: "Alias del usuario que realiza la operación",
    required: false,
  })
  @Optional()
  @IsString()
  alias?: string;

  @ApiProperty({
    example: "viventodev26@mail.com",
    description: "Correo electrónico del usuario que realiza la operación",
    required: false,
  })
  @Optional()
  @IsString()
  email?: string;

  @ApiProperty({
    example: {
        "sessionIdGT": "1785533276",
        "clientIdGT": "1462492111.1785533277",
        "registerMethod": "email",
        "country": "MX",
        "affiliate": "",
        "campaign": {
            "source": "google",
            "medium": "cpc",
            "name": "brandterms_general"
        }
  }})
  @Type(() => SingupExtraTaggingDto)
  @IsObject()
  @ValidateNested()
  @IsOptional()
  extra?: SingupExtraTaggingDto;
}
