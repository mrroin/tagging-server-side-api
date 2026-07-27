import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

@ApiSchema({
  description:
    "Estructura de datos para generar métrica, puede enviar cualquier JSON",
})
@Exclude()
export class TaggingDto {
  @IsString()
  @ApiProperty({
    example: "1",
    description: "Version del json",
    required: false,
  })
  @IsOptional()
  version?: string;
}
