import { Module } from "@nestjs/common";
import { HttpAdapterService } from "./adapters/http.adapter";
import { TaggingManagerService } from "./services/tagging-manager.service";

@Module({
  providers: [HttpAdapterService, TaggingManagerService],
  exports: [HttpAdapterService, TaggingManagerService],
})
export class CommonModule {}
