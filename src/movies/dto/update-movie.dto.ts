import { IsNumber, IsString } from 'class-validator';

export class UpdateMovieDto {
  @IsString()
  readonly title?: string; // ?는 필수가 아니라는 뜻

  @IsNumber()
  readonly year?: number;

  @IsString({ each: true })
  readonly genres?: string[];
}
