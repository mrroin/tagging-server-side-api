import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TaggingDto } from "./dto/tagging.dto";
import { TaggingManagerService } from "@common/services/tagging-manager.service";
import { TaggingResponseDto } from "./dto/tagging-response.dto";

@Injectable()
export class TaggingService {
  private readonly logger = new Logger(`management-api ${TaggingService.name}`);
  constructor(
    private readonly _configService: ConfigService,
    private readonly _TaggingManagerService: TaggingManagerService
  ) {
    this.logger.log(
      `TaggingService => constructor: ${_configService.get("globalPrefix")}`
    );
  }

  async login(taggingDto: TaggingDto | any) {
    this.logger.log(
      "TaggingService => login, llegando a service: ",
      taggingDto
    );
    try {
      await this._TaggingManagerService.sendTagging("userId7", "login", {
        myData: "tagging-server-side-api",
        session_id: Date.now().toString(),
        ...taggingDto,
      });
      return new TaggingResponseDto(
        "Este evento agrego un nuevo tagging para login"
      );
    } catch (error) {
      throw new InternalServerErrorException("Error sending tagging for login");
    }
  }

  async singup(taggingDto: TaggingDto | any) {
    this.logger.log(
      "TaggingService => singup, llegando a service: ",
      taggingDto
    );
    await this._TaggingManagerService.sendTagging("userId7", "singup", {
      myData: "tagging-server-side-api",
      session_id: Date.now().toString(),
      ...taggingDto,
    });
    return new TaggingResponseDto(
      "Este evento agrego un nuevo tagging para singup"
    );
  }

  async firstDeposit(taggingDto: TaggingDto | any) {
    this.logger.log(
      "TaggingService => firstDeposit, llegando a service: ",
      taggingDto
    );
    await this._TaggingManagerService.sendTagging("userId7", "firstDeposit", {
      myData: "tagging-server-side-api",
      session_id: Date.now().toString(),
      ...taggingDto,
    });
    return new TaggingResponseDto(
      "Este evento agrego un nuevo tagging para first deposit"
    );
  }

  async deposit(taggingDto: TaggingDto | any) {
    this.logger.log(
      "TaggingService => deposit, llegando a service: ",
      taggingDto
    );
    await this._TaggingManagerService.sendTagging("userId7", "deposit", {
      myData: "tagging-server-side-api",
      session_id: Date.now().toString(),
      ...taggingDto,
    });
    return new TaggingResponseDto(
      "Este evento agrego un nuevo tagging para deposit"
    );
  }
}
