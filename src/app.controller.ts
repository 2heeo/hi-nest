import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // 예) 컨틀롤러에서 아래의 Get 데코레이터는 /hello라는 url을 다져와 sayHello 함수를 실행 (localhost:3000/hello)
  // 덕분에 NestJs에서는 라우터를 셋팅하지 않아도 됨
  // 주의 할 점은 sayHello는 @Get 데코레이터와 코드상 떨어져있으면 안됨(바로 아래줄에 위치)
  // @Post 데코레이터로도 할 수 있음
  @Get('/hello')
  sayHello(): string {
    return 'Hello everyone';
  }
}
