import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';

import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { MovieService } from './movie.service';
import { MovieEntitiy } from './entitiy/movie.entitiy';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@ApiTags('Movie (영화 관련 API)')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  /*
   * GET
   */
  @Get()
  @ApiOperation({
    summary: '모든 영화 불러오기',
    description: '데이터베이스에 저장되어있는 모든 영화를 불러옵니다.',
  })
  @ApiOkResponse({
    type: MovieEntitiy,
    isArray: true,
  })
  findAll() {
    return this.movieService.findAllMovies();
  }

  @Get('/search')
  @ApiOperation({
    summary: '영화 검색하기',
    description: '영화 제목을 기준으로 검색합니다',
  })
  @ApiQuery({
    name: 'q',
    type: String,
    description: '영화 제목 검색',
    required: true,
  })
  @ApiOkResponse({
    type: MovieEntitiy,
    isArray: true,
  })
  findSearchResult(@Query('q') q?: string) {
    return this.movieService.searchMovies(q);
  }

  @Get('random')
  @ApiOperation({
    summary: '랜덤 영화 불러오기',
    description: '랜덤 3개의 영화를 불러옵니다 (추천영화에 사용하세요)',
  })
  @ApiOkResponse({
    type: MovieEntitiy,
    isArray: true,
  })
  findRandom() {
    return this.movieService.findRandomMovies();
  }

  @Get(':movieId')
  @ApiOperation({
    summary: '특정 영화 불러오기',
    description: 'id를 기준으로 특정 영화의 정보를 불러옵니다',
  })
  @ApiParam({
    name: 'movieId',
    description: '정보를 불러오려는 영화의 아이디',
    type: Number,
  })
  @ApiOkResponse({
    type: MovieEntitiy,
  })
  @ApiNotFoundResponse({
    description: '{id}번 영화는 존재하지 않습니다',
  })
  findOne(@Param('movieId') movieId: number) {
    return this.movieService.findOneMovie(movieId);
  }

  /*
   * POST
   */
  @Post()
  @ApiOperation({
    summary: '새로운 영화 생성하기',
    description: '새로운 영화를 생성합니다.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          description: '영화 아이디',
        },
        title: {
          type: 'string',
          description: '영화 제목',
        },
        subTitle: {
          type: 'string',
          description: '영화 부제',
        },
        description: {
          type: 'string',
          description: '영화 소개',
        },
        releaseDate: {
          type: 'string',
          description: '개봉일',
        },
        company: {
          type: 'string',
          description: '제작사',
        },
        genres: {
          type: 'string[]',
          description: '장르',
        },
        runtime: {
          type: 'number',
          description: '상영시간',
        },
        posterImgUrl: {
          type: 'string',
          description: '영화 표지 이미지 링크(URL)',
          nullable: true,
        },
      },
    },
  })
  @ApiCreatedResponse({
    type: MovieEntitiy,
  })
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.createMovie(createMovieDto);
  }

  /*
   * PATCH
   */
  @Patch(':movieId')
  @ApiOperation({
    summary: '영화 정보 수정하기',
    description: '특정 영화의 정보를 수정합니다.',
  })
  @ApiParam({
    name: 'movieId',
    description: '정보를 수정하려는 영화의 아이디',
    type: Number,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          description: '영화 아이디',
        },
        title: {
          type: 'string',
          description: '영화 제목',
        },
        subTitle: {
          type: 'string',
          description: '영화 부제',
        },
        description: {
          type: 'string',
          description: '영화 소개',
        },
        releaseDate: {
          type: 'string',
          description: '개봉일',
        },
        company: {
          type: 'string',
          description: '제작사',
        },
        genres: {
          type: 'string[]',
          description: '장르',
        },
        runtime: {
          type: 'number',
          description: '상영시간',
        },
        posterImgUrl: {
          type: 'string',
          description: '영화 표지 이미지 링크(URL)',
          nullable: true,
        },
      },
    },
  })
  @ApiOkResponse({
    type: MovieEntitiy,
  })
  @ApiNotFoundResponse()
  update(
    @Param('movieId') movieId: number,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return this.movieService.updateMovie(movieId, updateMovieDto);
  }

  /*
   * DELETE
   */
  @Delete(':movieId')
  @ApiOperation({
    summary: '영화 삭제하기',
    description:
      '특정 영화를 삭제합니다. (주의! 영화에 달린 리뷰도 함께 삭제됩니다)',
  })
  @ApiParam({
    name: 'movieId',
    description: '삭제하려는 영화의 아이디',
    type: Number,
  })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  delete(@Param('movieId') movieId: number) {
    return this.movieService.removeMovie(movieId);
  }
}
