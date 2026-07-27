import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { IsString } from "class-validator";

@ApiSchema({ description: "Data structure for response event" })
export class TaggingResponseDto {
  constructor(message: string) {
    this.response = message;
    this.timestamp = new Date().toISOString();
  }
  @IsString()
  @ApiProperty({
    example: "Este evento agrego un nuevo tagging para ...",
    description: "Message for the tagging response",
    required: true,
  })
  response: string;

  @IsString()
  @ApiProperty({
    example: "2026-07-24T02:58:46.058Z",
    description: "Timestamp for the tagging response",
    required: true,
  })
  timestamp: string;
}
