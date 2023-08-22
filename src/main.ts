import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(new ValidationPipe());

  var serviceAccount = require('../configs/private-key.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  await app.listen(3000);
}
bootstrap();
