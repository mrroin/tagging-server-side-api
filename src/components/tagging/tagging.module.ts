import { Module } from '@nestjs/common';
import { TaggingService } from './tagging.service';
import { TaggingController } from './tagging.controller';

@Module({
  controllers: [TaggingController],
  providers: [TaggingService],
})
export class TaggingModule {}
