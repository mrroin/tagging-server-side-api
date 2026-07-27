import { Module } from "@nestjs/common";
import { TaggingService } from "./tagging.service";
import { TaggingController } from "./tagging.controller";
import { CommonModule } from "@common/common.module";

@Module({
  controllers: [TaggingController],
  providers: [TaggingService],
  imports: [CommonModule],
})
export class TaggingModule {}
