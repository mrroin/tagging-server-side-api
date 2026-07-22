import { Injectable } from '@nestjs/common';
import { TaggingDto } from './dto/tagging.dto';

@Injectable()
export class TaggingService {
  login(taggingDto: TaggingDto | any) {
    console.log("TaggingService => login, incoming service: ", taggingDto);
    return 'This action adds a new tagging for login';
  }

  singup(taggingDto: TaggingDto | any) {
    console.log("TaggingService => singup, incoming service: ", taggingDto);
    return 'This action adds a new tagging for singup';
  }

  firstDeposit(taggingDto: TaggingDto | any) {
    console.log("TaggingService => firstDeposit, incoming service: ", taggingDto);
    return 'This action adds a new tagging for first deposit';
  }

  deposit(taggingDto: TaggingDto | any) {
    console.log("TaggingService => deposit, incoming service: ", taggingDto);
    return 'This action adds a new tagging for deposit';
  }
}
