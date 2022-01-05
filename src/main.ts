import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// main.ts는 항상 존재하며 이름은 바꾸지 말 것 (NestJs의 어플리케이션은 main.ts에서 시작)
// bootstrap 함수는 마음대로
// await NestFactory.create(AppModule)를 호출하고, app은 포트 3000을 리스닝함
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
