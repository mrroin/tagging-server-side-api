import { Module } from '@nestjs/common';
import { TaggingModule } from './components/tagging/tagging.module';

@Module({
  imports: [TaggingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
