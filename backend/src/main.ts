import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule);
  app.enableCors();

  const config: ConfigService = app.get(ConfigService);
  const port: number = parseInt(config.get('PORT'), 10);
  const host: string = config.get<string>('HOST');

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(port, host, () => {
    console.log(`Server listening on http://${host}:${port}`);
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });
}

bootstrap();
