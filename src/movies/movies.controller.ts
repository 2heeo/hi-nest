import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Body,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/Movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
  // http://localhost:3000/movies
  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  // http://localhost:3000/movies/search?year=2000
  // search가 밑의 getOne 보다 밑에 있으면 NestJssms search를 /:id로 판단하기 떄문에 위로 올려줘야함
  @Get('search')
  search(@Query('year') searchingYear) {
    return `we are searching for a movie made after: ${searchingYear}`;
  }

  // http://localhost:3000/movies/1
  @Get(':id')
  getOne(@Param('id') movieId: number): Movie {
    // @Get의 id 네이밍과 와 @Param의 id 네이밍은 같아야함, movieId 부분은 달라도 됨
    return this.moviesService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    return this.moviesService.create(movieData);
  }

  @Delete('/:id')
  remove(@Param('id') movieId: number) {
    return this.moviesService.deleteOne(movieId);
  }

  // Patch는 리소스의 일부분만, Put은 하면 모든 리소스 업데이트
  @Patch('/:id')
  patch(@Param('id') movieId: number, @Body() updateData) {
    return this.moviesService.update(movieId, updateData);
  }
}
