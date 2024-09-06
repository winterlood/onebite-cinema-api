import { PrismaClient } from '@prisma/client';
import movieData from './movie.json';
import reviewData from './review.json';
import { removeWhitespace } from 'src/util/remove-whitepsace';
const prisma = new PrismaClient();

async function truncateAllTable() {
  const tablenames = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

  const tables = tablenames
    .map(({ tablename }) => tablename)
    .filter((name) => name !== '_prisma_migrations')
    .map((name) => `"public"."${name}"`)
    .join(', ');

  try {
    await prisma.$executeRawUnsafe(
      `TRUNCATE TABLE ${tables} RESTART IDENTITY;`,
    );
  } catch (error) {
    console.log({ error });
  }
}

async function createSeedData() {
  await prisma.movie.createMany({
    data: movieData.map((movie) => ({
      id: movie.id,
      title: movie.title,
      subTitle: movie.tagline,
      description: movie.overview,
      releaseDate: movie.release_date,
      company: movie.production_companies.map(({ name }) => name).join(', '),
      genres: movie.genres.map(({ name }) => name),
      runtime: movie.runtime,
      posterImgUrl: `https://media.themoviedb.org/t/p/w300_and_h450_face${movie.poster_path}`,
      searchIndex: removeWhitespace([
        movie.title,
        movie.tagline,
        movie.overview,
      ]),
    })),
  });

  await prisma.review.createMany({
    data: reviewData.map((review) => ({
      author: review.author,
      content: review.content,
      movieId: review.movieId,
    })),
  });
}

async function main() {
  await truncateAllTable();
  await createSeedData();
}

main();
