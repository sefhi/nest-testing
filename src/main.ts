import { NestFactory } from '@nestjs/core';
import { AppModule } from './Shared/Infrastruture/Framework/Controllers/Config/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
