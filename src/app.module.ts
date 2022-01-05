import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// @Module -> Decorator(클래스에 함수 기능을 추가 할 수 있기 떄문에 NestJs에서 중요한 존재/ class를 위해 동작)
@Module({
  imports: [],
  controllers: [AppController], // url을 가져오고 함수를 실행(함수로 매핑)
  providers: [AppService], // 비즈니스 로직을 실행
})

// AppModule은 루트모듈의 역할로 하나만 존재하며, 내가 만들 모든 apo를 import함
// 왜냐하면 AppModule은 main.ts에서 NestJs가 내 어플리케이션을 만들기 위해 이용하는 것이기 때문
// const app = await NestFactory.create(AppModule);
export class AppModule {}
