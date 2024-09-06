import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { prismaExclude } from 'src/util/prisma-exclude';
import { removeWhitespace } from 'src/util/remove-whitepsace';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MovieService {
  constructor(private prisma: PrismaService) {}

  async createMovie(createMovieDto: CreateMovieDto) {
    const searchIndex = removeWhitespace([createMovieDto.title]);

    return await this.prisma.movie.create({
      data: { ...createMovieDto, searchIndex },
      select: prismaExclude('Movie', ['searchIndex']),
    });
  }

  async findAllMovies() {
    return await this.prisma.movie.findMany({
      select: prismaExclude('Movie', ['searchIndex']),
    });
  }

  async searchMovies(q?: string) {
    const searchText = q.replace(/\s+/g, '');
    console.log(searchText);
    return await this.prisma.movie.findMany({
      select: prismaExclude('Movie', ['searchIndex']),
      where: {
        OR: [
          {
            searchIndex: { contains: searchText, mode: 'insensitive' },
          },
        ],
      },
    });
  }

  async findRandomMovies() {
    const query = `
    SELECT * FROM "Movie" ORDER BY RANDOM() LIMIT 3
    `;
    return await this.prisma.$queryRawUnsafe(query);
  }

  async findOneMovie(id: number) {
    const movie = await this.prisma.movie.findUnique({
      select: prismaExclude('Movie', ['searchIndex']),
      where: {
        id: id,
      },
    });
    if (!movie) {
      throw new NotFoundException(`${id}번 영화는 존재하지 않습니다`);
    }
    return movie;
  }

  async updateMovie(id: number, dto: UpdateMovieDto) {
    const beforeUpdateData = await this.prisma.movie
      .findUnique({
        select: prismaExclude('Movie', ['searchIndex']),
        where: {
          id: id,
        },
      })
      .catch((err) => console.log(err));

    if (!beforeUpdateData) {
      throw new NotFoundException(`${id}번 영화는 존재하지 않습니다`);
    }

    const searchIndex = removeWhitespace([dto.title ?? beforeUpdateData.title]);

    return await this.prisma.movie.update({
      select: prismaExclude('Movie', ['searchIndex']),
      where: {
        id: id,
      },
      data: { ...dto, searchIndex },
    });
  }

  async removeMovie(id: number) {
    await this.prisma.movie.delete({
      where: {
        id: id,
      },
    });
  }
}
