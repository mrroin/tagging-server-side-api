import {
  Controller,
  Post,
  Body,
  HttpCode,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { TaggingService } from "./tagging.service";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { TaggingResponseDto } from "./dto/tagging-response.dto";
import { Throttle } from "@nestjs/throttler";
import { ConfigService } from "@nestjs/config";
import { LoginTaggingDto } from "./dto/login-tagging.dto";
import { SingupTaggingDto } from "./dto/singup-tagging.dto";
import { DepositTaggingDto } from "./dto/deposit-tagging.dto";
import { VerifyTaggingDto } from "./dto/verify-tagging.dto";

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
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiResponse({
    status: 429,
    description: "ThrottlerException: Too Many Requests",
  })
  @Throttle({ login: {} })
  @UsePipes(
    new ValidationPipe({
      whitelist: true, // Solo valida propiedades con decoradores
      forbidNonWhitelisted: false, // 👈 PERMITE propiedades extra como 'user2'
      transform: true, // Transforma a la clase DTO
    })
  )
  @ApiBody({ type: LoginTaggingDto })
  login(@Body() taggingDto: LoginTaggingDto | any) {
    return this.taggingService.login(taggingDto);
  }

  @Post("singup")
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: "La solicitud fue procesada",
    type: TaggingResponseDto,
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiResponse({ status: 500, description: "Error al procesar la solicitud" })
  @ApiResponse({
    status: 429,
    description: "ThrottlerException: Too Many Requests",
  })
  @Throttle({ singup: {} })
  @ApiBody({ type: SingupTaggingDto })
  singup(@Body() taggingDto: SingupTaggingDto | any) {
    return this.taggingService.singup(taggingDto);
  }

  @Post("first-deposit")
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: "La solicitud fue procesada",
    type: TaggingResponseDto,
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiResponse({ status: 500, description: "Error al procesar la solicitud" })
  @ApiResponse({
    status: 429,
    description: "ThrottlerException: Too Many Requests",
  })
  @Throttle({ "first-deposit": {} })
  @ApiBody({ type: DepositTaggingDto })
  firstDeposit(@Body() taggingDto: DepositTaggingDto | any) {
    return this.taggingService.firstDeposit(taggingDto);
  }

  @Post("deposit")
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: "La solicitud fue procesada",
    type: TaggingResponseDto,
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiResponse({ status: 500, description: "Error al procesar la solicitud" })
  @ApiResponse({
    status: 429,
    description: "ThrottlerException: Too Many Requests",
  })
  @Throttle({ deposit: {} })
  @ApiBody({ type: DepositTaggingDto })
  deposit(@Body() taggingDto: DepositTaggingDto | any) {
    return this.taggingService.deposit(taggingDto);
  }

  @Post("verify")
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: "La solicitud fue procesada",
    type: TaggingResponseDto,
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiResponse({ status: 500, description: "Error al procesar la solicitud" })
  @ApiResponse({
    status: 429,
    description: "ThrottlerException: Too Many Requests",
  })
  @Throttle({ general: {} })
  @ApiBody({ type: VerifyTaggingDto })
  verify(@Body() taggingDto: VerifyTaggingDto | any) {
    return this.taggingService.verify(taggingDto);
  }
}
