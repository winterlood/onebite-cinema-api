import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './movie/movie.module';
import { PrismaModule } from './prisma/prisma.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [MovieModule, ReviewModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
