import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { EventsGateway } from './api/events/events.gateway';
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');
  const host: number = config.get<any>('HOST');

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(port, () => {
    console.log(`Server listening on http://${host}:${port}`);
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });
}

bootstrap();
