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
  // @Get('/hello')
  // sayHello(): string {
  //   return 'Hello everyone';
  // }

  // 그렇다면 위의 Get 데코레이터에서 string 값을 리턴하면 브라우저에서 잘 동작하는데 왜 appService가 필요할까?
  // NestJs는 컨트롤러를 비지니스 로직이랑 구분 짓고 싶어함
  // 컨트롤러는 그냥 url을 가져오고 함수를 실행하는 역할만 하고 나머지 비즈니스 로직은 서비스로 감
  // 서비스는 일반적으로 실제로 function을 가지는 부분임
  // 따라서 app.service.ts에서 getHi 함수를 만들고 아래와 같이 실행 할 수 있음
  @Get('/hello')
  sayHello(): string {
    return this.appService.getHi();
  }
}
