import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule);
  app.enableCors();

  const config: ConfigService = app.get(ConfigService);
  // const port: number = config.get<number>('PORT');
  // const host: number = config.get<any>('HOST');
  const port: number = 3000;
  const host: string = '0.0.0.0';
  

    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

    await app.listen(3000, '0.0.0.0')

  app.enableVersioning({
    type: VersioningType.URI,
  });
}

bootstrap();
