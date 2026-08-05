import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { IsNumber, IsObject, IsOptional, IsString, ValidateIf, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ExtraTaggingDto } from "./extra-tagging.dto";

@ApiSchema({
  description:
    "Estructura de datos para generar métrica al evento first deposit y deposit, permite recibir cualquier JSON",
})
export class DepositTaggingDto {
  @ApiProperty({
    example: "100",
    description: "Usuario que realiza la operación",
    required: true,
  })
  @ValidateIf((o) => typeof o.userId === 'string')
  @IsString()
  @ValidateIf((o) => typeof o.userId === 'number')
  @IsNumber()
  user: string | number;
  
  @ApiProperty({
    example: "5010",
    description: "Monto de la operación, con centavos sin punto",
    required: false,
  })
  @IsString()
  @IsOptional()
  amount?: string;
  
  @ApiProperty({
    example: "39879",
    description: "Identificador de la operación",
    required: false,
  })
  @IsString()
  @IsOptional()
  operation?: string;
  
  @ApiProperty({
    example: "MXN",
    description: "Moneda en la que se ralizar la operación",
    required: false,
  })
  @IsString()
  @IsOptional()
  currency?: string;

  @ApiProperty({
    example: {
      "sessionIdGT": "1785533276",
      "clientIdGT": "1462492111.1785533277",
      "campaign": {
          "source": "google",
          "medium": "cpc",
          "name": "brandterms_general"
      }
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
