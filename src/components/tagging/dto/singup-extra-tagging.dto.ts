import { ApiProperty, ApiSchema, PartialType } from "@nestjs/swagger";
import { ExtraTaggingDto } from "./extra-tagging.dto";
import { IsOptional, IsString } from "class-validator";

@ApiSchema({
  description:
    "Información de la extra de Google Tag Manager, campaña y datos de registro de usuario",
})
export class SingupExtraTaggingDto extends PartialType(ExtraTaggingDto) {
  @ApiProperty({
    example: "email",
    description: "Método de registro del usuario",
    required: false,
  })
  @IsOptional()
  @IsString()
  registerMethod?: string;

  @ApiProperty({
    example: "MX",
    description: "País de registro del usuario",
    required: false,
  })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({
    example: "0191910",
    description: "Afiliado de cliente de Google Tag Manager",
    required: false,
  })
  @IsOptional()
  @IsString()
  affiliate?: string;
}
