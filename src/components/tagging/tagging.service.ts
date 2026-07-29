import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TaggingDto } from "./dto/tagging.dto";
import { TaggingManagerService } from "@common/services/tagging-manager.service";
import { TaggingResponseDto } from "./dto/tagging-response.dto";
import { instanceToPlain } from "class-transformer";

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
      JSON.stringify(taggingDto)
    );
    try {
      const jsonObject = instanceToPlain(taggingDto);
      await this._TaggingManagerService.sendTagging("userId7", "login", {
        myData: "tagging-server-side-api",
        session_id: Date.now().toString(),
        ...jsonObject,
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
      JSON.stringify(taggingDto)
    );
    try {
      const jsonObject = instanceToPlain(taggingDto);
      await this._TaggingManagerService.sendTagging("userId7", "singup", {
        myData: "tagging-server-side-api",
        session_id: Date.now().toString(),
        ...jsonObject,
      });
      return new TaggingResponseDto(
        "Este evento agrego un nuevo tagging para singup"
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Error sending tagging for singup"
      );
    }
  }

  async firstDeposit(taggingDto: TaggingDto | any) {
    this.logger.log(
      "TaggingService => firstDeposit, llegando a service: ",
      JSON.stringify(taggingDto)
    );
    try {
      const jsonObject = instanceToPlain(taggingDto);
      await this._TaggingManagerService.sendTagging(jsonObject?.user, "vivento_ftd", {
        value: (parseInt(jsonObject?.amount, 10) / 100).toFixed(2),
        transaction_id: jsonObject?.operation,
        currency: jsonObject?.currency,
      });
      return new TaggingResponseDto(
        "Este evento agrego un nuevo tagging para first firstDeposit"
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Error sending tagging for firstDeposit"
      );
    }
  }

  async deposit(taggingDto: TaggingDto | any) {
    this.logger.log(
      "TaggingService => deposit, llegando a service: ",
      JSON.stringify(taggingDto)
    );
    try {
      const jsonObject = instanceToPlain(taggingDto);
      await this._TaggingManagerService.sendTagging(jsonObject?.user, "vivento_redeposit", {
        value: (parseInt(jsonObject?.amount, 10) / 100).toFixed(2),
        transaction_id: jsonObject?.operation,
        currency: jsonObject?.currency,
      });
      return new TaggingResponseDto(
        "Este evento agrego un nuevo tagging para deposit"
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Error sending tagging for deposit"
      );
    }
  }
}
