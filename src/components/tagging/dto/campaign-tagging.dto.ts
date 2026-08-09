import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

@ApiSchema({
  description: "Información de la campaña",
})
export class CampaignTaggingDto {
  @ApiProperty({
    example: "source",
    description: "Fuente de información de la campaña",
    required: false,
  })
  @IsString()
  @IsOptional()
  source?: string;

  @ApiProperty({
    example: "cpc",
    description: "Medio de la campaña",
    required: false,
  })
  @IsString()
  @IsOptional()
  medium?: string;

  @ApiProperty({
    example: "brandterms_general",
    description: "Nombre de la campaña",
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;
}
