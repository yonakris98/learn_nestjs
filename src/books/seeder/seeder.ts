import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { SeederService } from './seeder.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seederService = app.get(SeederService);

  await seederService.seed();
  await app.close();
}

bootstrap();
