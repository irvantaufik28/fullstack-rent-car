import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
import { FastifyRequest, FastifyReply } from 'fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  app.enableCors();

  const config: ConfigService = app.get(ConfigService);
  const port: number = parseInt(config.get<string>('PORT'), 10) || 4021;
  const host: string = config.get<string>('HOST') || '0.0.0.0';

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.enableVersioning({
    type: VersioningType.URI,
  });

  await app.listen(port, host, (err, address) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`Server is running on ${address}`);
  });
}

bootstrap();
