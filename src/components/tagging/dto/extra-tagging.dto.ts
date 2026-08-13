import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import {
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { CampaignTaggingDto } from "./campaign-tagging.dto";
import { Type } from "class-transformer";

@ApiSchema({
  description: "Información de la extra de Google Tag Manager y campaña",
})
export class ExtraTaggingDto {
  @ApiProperty({
    example: "1785533276",
    description: "Sesion de Google Tag Manager",
    required: false,
  })
  @IsOptional()
  @IsString()
  sessionIdGT?: string;

  @ApiProperty({
    example: "1785533276",
    description: "Identificador de cliente de Google Tag Manager",
    required: false,
  })
  @IsOptional()
  @IsString()
  clientIdGT?: string;

  @ApiProperty({
    example: {
      source: "google",
      medium: "cpc",
      name: "brandterms_general",
    },
    description: "Información de la campaña",
    required: false,
  })
  @Type(() => CampaignTaggingDto)
  @IsObject()
  @ValidateNested()
  @IsOptional()
  campaign?: CampaignTaggingDto;

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

  @ApiProperty({
    example: "mail@site.com",
    description: "Email del usuario",
    required: false,
  })
  @IsOptional()
  @IsString()
  email?: string;
}
