import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const apiPrefix = 'api';
  const docsPrefix = 'docs';
  const port = process.env.PORT || 3000;

  app.setGlobalPrefix(apiPrefix);

  const config = new DocumentBuilder()
    .setTitle('Guard')
    .setDescription('Guard API')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(docsPrefix, app, documentFactory);

  app.enableCors();

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${apiPrefix}`
  );
  Logger.log(
    `📑 Documentation is running on: http://localhost:${port}/${docsPrefix}`
  );
}

bootstrap();
