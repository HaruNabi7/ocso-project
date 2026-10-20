import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
<<<<<<< HEAD
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: process.env.allowedOrigin
    }
  });
  const config = new DocumentBuilder()
    .setTitle('Ocso API')
    .setDescription('Api for ocso management')
    .setVersion('0.9')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
=======
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Ocso API')
    .setDescription('API for Ocso project')
    .setVersion('0.9')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
>>>>>>> 2b6fa6c286d08cdf6a425abd1b5e46773622ca9e
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }))
<<<<<<< HEAD
  await app.listen(4000);
}
bootstrap();
=======
  await app.listen(process.env.PORT ?? 7777);
}
await bootstrap();
>>>>>>> 2b6fa6c286d08cdf6a425abd1b5e46773622ca9e
