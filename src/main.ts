import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: ['http://localhost:3000'] });
  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.PORT || 8000;
  await app.listen(port);
}
bootstrap();
