import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  // NestJs는 테스트를 실행할때마다 어플리케이션(브라우저에서 테스트 할 수 있는 진짜 어플리케이션 말고 각 테스트를 위한 어플리케이션)을 생성하는데(createTestingModule)
  // it('POST', () => {...});에서 매번 create하기 싫어서 beforeEach -> beforeAll로 바꿔서 새로운 테스트를 진행할 때마다 어플리케이션이 새로 생성되게 함
  // 그렇게 함으로써 테스트용 데이터베이스는 항상 처음에 비어있게됨
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // 테스트 어플리케이션(spec.ts)에서도 실제 어플리케이션(main.ts)의 환경을 그대로 적용시켜줘야함
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('welcome to my Movie API');
  });

  describe('/movies', () => {
    // movies에 GET요청 하는것을 테스트
    it('GET', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });

    it('POST 201', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test',
          year: 2000,
          genres: ['test'],
        })
        .expect(201);
    });
    it('POST 400', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test',
          year: 2000,
          genres: ['test'],
          other: 'thing',
        })
        .expect(400);
    });
    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });
  });

  describe('/movies/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer()).get('/movies/1').expect(200);
    });
    it('GET 404', () => {
      return request(app.getHttpServer()).get('/movies/999').expect(404);
    });
    it('PATCH', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({ title: 'updated test' })
        .expect(200);
    });
    // Patch 전에 delete는 의미가 없으므로(남아있는 movie가 없음) delete 테스트의 순서는 patch 뒤에..
    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(200);
    });
  });
});
