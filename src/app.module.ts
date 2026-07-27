import { Module } from "@nestjs/common";
import { TaggingModule } from "./components/tagging/tagging.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { EnvConfiguration } from "@config/env.config";
import { JoiValidationSchema } from "@config/joi.validation";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          // Named configuration 'login'
          name: 'login',
          ttl: config.get<number>('throttleLoginTtl', 60000),
          limit: config.get<number>('throttleLoginLimit', 1000),
        },
        {
          // Named configuration 'singup'
          name: 'singup',
          ttl: config.get<number>('throttleSingupTtl', 60000),
          limit: config.get<number>('throttleSingupLimit', 1000),
        },
        {
          // Named configuration 'first-deposit'
          name: 'first-deposit',
          ttl: config.get<number>('throttleFirstDepositTtl', 60000),
          limit: config.get<number>('throttleFirstDepositLimit', 1000),
        },
        {
          // Named configuration 'deposit'
          name: 'deposit',
          ttl: config.get<number>('throttleDepositTtl', 60000),
          limit: config.get<number>('throttleDepositLimit', 1000),
        },
      ],
    }),
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
      isGlobal: true,
    }),
    TaggingModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard, // Applies the rate-limiter globally
    },
  ],
})
export class AppModule {}
