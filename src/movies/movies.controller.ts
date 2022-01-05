import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  // http://localhost:3000/movies
  @Get()
  getAll() {
    return 'This will return all movies';
  }

  // http://localhost:3000/movies/1
  @Get('/:id')
  getOne(@Param('id') movieId: string) {
    // @Get의 id 네이밍과 와 @Param의 id 네이밍은 같아야함, movieId 부분은 달라도 됨
    return `This will return one movie with the id ${movieId}`;
  }

  @Post()
  create() {
    return 'This will create a movie';
  }

  @Delete('/:id')
  remove(@Param('id') movieId: string) {
    return `This will delete a movie with the id ${movieId}`;
  }

  // Patch는 리소스의 일부분만, Put은 하면 모든 리소스 업데이트
  @Patch('/:id')
  patch(@Param('id') movieId: string) {
    return `This will patch a movie with the id ${movieId}`;
  }
}
