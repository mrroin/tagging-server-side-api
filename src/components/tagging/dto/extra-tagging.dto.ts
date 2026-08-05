import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { CampaignTaggingDto } from "./campaign-tagging.dto";
import { Type } from "class-transformer";

@ApiSchema({
  description:
    "Información de la extra de Google Tag Manager y campaña",
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
      "source": "google",
      "medium": "cpc",
      "name": "brandterms_general"
    },
    description: "Información de la campaña",
    required: false,
  })
  @Type(() => CampaignTaggingDto)
  @IsObject()
  @ValidateNested()
  @IsOptional()
  campaign?: CampaignTaggingDto;
}
