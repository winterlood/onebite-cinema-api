import { ApiProperty } from '@nestjs/swagger';

export class MovieEntitiy {
  @ApiProperty({
    description: '아이디',
  })
  id: number;

  @ApiProperty({
    description: '영화 제목',
  })
  title: string;

  @ApiProperty({
    description: '영화 부제',
  })
  subTitle: string;

  @ApiProperty({
    description: '영화 소개',
  })
  description: string;

  @ApiProperty({
    description: '개봉일',
  })
  releaseDate: string;

  @ApiProperty({
    description: '제작사',
  })
  company: string;

  @ApiProperty({
    description: '장르',
  })
  genres: string[];

  @ApiProperty({
    description: '상영시간(런타임)',
  })
  runtime: number;

  @ApiProperty({
    description: '영화 표지 이미지 URL',
  })
  posterImgUrl: string;
}
