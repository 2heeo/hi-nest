import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// @Module -> Decorator(클래스에 함수 기능을 추가 할 수 있기 떄문에 NestJs에서 중요한 존재/ class를 위해 동작)
@Module({
  imports: [],
  controllers: [AppController], // url을 가져오고 함수를 실행(함수로 매핑)
  providers: [AppService],
})
export class AppModule {}
