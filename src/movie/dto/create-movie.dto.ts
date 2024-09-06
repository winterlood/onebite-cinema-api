import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { IsCustomUrl, IsNonEmptyString } from 'src/validate-decorators';

export class CreateMovieDto {
  @IsNonEmptyString()
  title: string;

  @IsNonEmptyString()
  subTitle: string;

  @IsNonEmptyString()
  description: string;

  @IsNonEmptyString()
  releaseDate: string;

  @IsNonEmptyString()
  company: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  genres: string[];

  @IsNotEmpty()
  @IsNumber()
  runtime: number;

  @IsCustomUrl()
  posterImgUrl: string;
}
