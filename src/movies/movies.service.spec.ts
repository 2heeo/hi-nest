import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // 안의 텍스트(getAll)는 테스트하려는 유닛(함수)이름과 똑같을 필요없지만 알아보기 쉽게..
  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      // id 1의 movie를 하나 만듦
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });

      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      // expect(movie.id).toEqual(1);
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(999); // id가 999인 걸 찾을때 NotFoundException 에러가 발생할텐데
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException); // 그게 잘 발생하는지 확인
        // expect(e.message).toEqual('Movie with ID 999 not found.'); // 에러메세지도 같은지 확인
      }
    });
  });
});
