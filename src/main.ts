import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// main.ts는 항상 존재하며 이름은 바꾸지 말 것 (NestJs의 어플리케이션은 main.ts에서 시작)
// bootstrap 함수는 마음대로
// await NestFactory.create(AppModule)를 호출하고, app은 포트 3000을 리스닝함
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // true로 설정되면 유효성 검사기는 유효성 검사 데코레이터를 사용하지 않는 속성의 유효성 검사(반환 된) 객체를 제거
      forbidNonWhitelisted: true, // true로 설정하면 화이트리스트에 없는 속성 검사기를 제거하는 대신 예외가 발생
      transform: true, // DTO 클래스에 따라 타입이 지정된 객체로 자동 변환 (예: url로 받은 id는 항상 string이지만 number로 자동변환해줌)
    }),
  );
  await app.listen(3000);
}
bootstrap();
