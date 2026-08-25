import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import {
  IsBoolean,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { ExtraTaggingDto } from "./extra-tagging.dto";
import { IsStringOrNumber } from "@common/decorators/is-string-or-number.decorator";
import { Optional } from "@nestjs/common";

@ApiSchema({
  description:
    "Estructura de datos para generar métrica al evento first deposit y deposit, permite recibir cualquier JSON",
})
export class VerifyTaggingDto {
  @ApiProperty({
    example: "100",
    description: "Usuario que realiza la operación",
    required: true,
  })
  @IsStringOrNumber()
  user: string | number;

  @ApiProperty({
    example: "APPROVED",
    description: "Estado de la operación",
    required: false,
  })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({
    example: true,
    description: "Resultado exitoso de la operación",
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  success?: boolean;

  @ApiProperty({
    example: 1,
    description: "Identificador de verificación de la operación",
    required: false,
  })
  @IsOptional()
  @IsStringOrNumber()
  verified?: string | number;

  @ApiProperty({
    example: "6a736e10cde3a6e6116fd910",
    description: "Identificador de la operación",
    required: false,
  })
  @IsString()
  @IsOptional()
  interviewId?: string;

  @ApiProperty({
    example: "viventodev26@mail.com",
    description: "Correo electrónico del usuario que realiza la operación",
    required: false,
  })
  @Optional()
  @IsString()
  email?: string;

  @ApiProperty({
    example: "34.198.101.115",
    description: "Ip del usuario que hace la petición",
    required: false,
  })
  @Optional()
  @IsString()
  ip?: string;

  @ApiProperty({
    example: "525511201001",
    description: "Número de teléfono del usuario que hace la petición",
    required: false,
  })
  @Optional()
  @IsString()
  mobile?: string;

  @ApiProperty({
    example: {
      sessionIdGT: "1785533276",
      clientIdGT: "1462492111.1785533277",
      campaign: {
        source: "google",
        medium: "cpc",
        name: "brandterms_general",
      },
    },
    description: "Información de la extra de Google Tag Manager y campaña",
    required: false,
  })
  @Type(() => ExtraTaggingDto)
  @IsObject()
  @ValidateNested()
  @IsOptional()
  extra?: ExtraTaggingDto;
}
