import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe, VersioningType } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { TaggingModule } from "@components/tagging/tagging.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(`${process.env.GLOBAL_PREFIX}`);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    })
  );
  const configBuilder = new DocumentBuilder()
    .setTitle("Tagging Server Side Api")
    .setDescription(
      "Este es un API para enviar eventos de tagging a Cuentas de Analytics desde el servidor."
    )
    .setVersion("1.0")
    .setExternalDoc(
      "Documentación",
      "https://raw.githubusercontent.com/mrroin/tagging-server-side-api/main/README.md"
    )
    .build();
  const document = SwaggerModule.createDocument(app, configBuilder, {
    include: [TaggingModule],
  });
  SwaggerModule.setup(`${process.env.GLOBAL_PREFIX}`, app, document);
  await app.listen(`${process.env.PORT}`, "0.0.0.0");
  console.log(
    "🚀 Server listen in: ",
    `${process.env.PORT}, version 0.0.1 040826 18:17`
  );
}
bootstrap();
