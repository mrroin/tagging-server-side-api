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

  @ApiProperty({
    example: "https://site.com",
    description: "Url de donde se envía el evento",
    required: false,
  })
  @IsOptional()
  @IsString()
  eventSourceUrl?: string;

  @ApiProperty({
    example: "192.168.1.1",
    description: "Ip de donde se envía el evento",
    required: false,
  })
  @IsOptional()
  @IsString()
  clientIpAddress?: string;

  @ApiProperty({
    example: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    description: "Datos de navegador de donde se envía el evento",
    required: false,
  })
  @IsOptional()
  @IsString()
  clientUserAgent?: string;

  @ApiProperty({
    example: "5536238933",
    description: "Datos de navegador de donde se envía el evento",
    required: false,
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    example: "uuidforfrontend0001",
    description: "Identificador del evento",
    required: false,
  })
  @IsOptional()
  @IsString()
  eventId?: string;
}
