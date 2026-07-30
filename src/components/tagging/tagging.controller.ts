import { Controller, Post, Body, HttpCode } from "@nestjs/common";
import { TaggingService } from "./tagging.service";
import { TaggingDto } from "./dto/tagging.dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { TaggingResponseDto } from "./dto/tagging-response.dto";
import { Throttle } from "@nestjs/throttler";
import { ConfigService } from "@nestjs/config";

@Controller("tagging")
@ApiTags("Tagging")
export class TaggingController {
  constructor(
    private readonly taggingService: TaggingService,
    private readonly _configService: ConfigService
  ) {}

  @Post("login")
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: "La solicitud fue procesada",
    type: TaggingResponseDto,
  })
  @ApiResponse({ status: 500, description: "Error al procesar la solicitud" })
  @ApiResponse({
    status: 429,
    description: "ThrottlerException: Too Many Requests",
  })
  @Throttle({ login: {} })
  login(@Body() taggingDto: TaggingDto | any) {
    return this.taggingService.login(taggingDto);
  }

  @Post("singup")
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: "La solicitud fue procesada",
    type: TaggingResponseDto,
  })
  @ApiResponse({ status: 500, description: "Error al procesar la solicitud" })
  @ApiResponse({
    status: 429,
    description: "ThrottlerException: Too Many Requests",
  })
  @Throttle({ singup: {} })
  singup(@Body() taggingDto: TaggingDto | any) {
    return this.taggingService.singup(taggingDto);
  }

  @Post("first-deposit")
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: "La solicitud fue procesada",
    type: TaggingResponseDto,
  })
  @ApiResponse({ status: 500, description: "Error al procesar la solicitud" })
  @ApiResponse({
    status: 429,
    description: "ThrottlerException: Too Many Requests",
  })
  @Throttle({ "first-deposit": {} })
  firstDeposit(@Body() taggingDto: TaggingDto | any) {
    return this.taggingService.firstDeposit(taggingDto);
  }

  @Post("deposit")
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: "La solicitud fue procesada",
    type: TaggingResponseDto,
  })
  @ApiResponse({ status: 500, description: "Error al procesar la solicitud" })
  @ApiResponse({
    status: 429,
    description: "ThrottlerException: Too Many Requests",
  })
  @Throttle({ deposit: {} })
  deposit(@Body() taggingDto: TaggingDto | any) {
    return this.taggingService.deposit(taggingDto);
  }

  @Post("verify")
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: "La solicitud fue procesada",
    type: TaggingResponseDto,
  })
  @ApiResponse({ status: 500, description: "Error al procesar la solicitud" })
  @ApiResponse({
    status: 429,
    description: "ThrottlerException: Too Many Requests",
  })
  @Throttle({ login: {} })
  verify(@Body() taggingDto: TaggingDto | any) {
    return this.taggingService.verify(taggingDto);
  }
}
