import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { IsObject, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ExtraTaggingDto } from "./extra-tagging.dto";
import { IsStringOrNumber } from "@common/decorators/is-string-or-number.decorator";

@ApiSchema({
  description:
    "Estructura de datos para generar métrica al evento login, permite recibir cualquier JSON",
})
export class LoginTaggingDto {
  @ApiProperty({
    example: "100",
    description: "Usuario que realiza la operación",
    required: true,
  })
  @IsStringOrNumber()
  user: string | number;

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
