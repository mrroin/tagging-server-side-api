import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaggingService } from './tagging.service';
import { TaggingDto } from './dto/tagging.dto';

@Controller('tagging')
export class TaggingController {
  constructor(private readonly taggingService: TaggingService) {}

  @Post('login')
  login(@Body() taggingDto: TaggingDto | any) {
    return this.taggingService.login(taggingDto);
  }

  @Post('singup')
  singup(@Body() taggingDto: TaggingDto | any) {
    return this.taggingService.singup(taggingDto);
  }

  @Post('first-deposit')
  firstDeposit(@Body() taggingDto: TaggingDto | any) {
    return this.taggingService.firstDeposit(taggingDto);
  }

  @Post('deposit')
  deposit(@Body() taggingDto: TaggingDto | any) {
    return this.taggingService.deposit(taggingDto);
  }
}
