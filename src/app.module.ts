import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MangaModule } from './manga/manga.module';
import { CoverModule } from './cover/cover.module';
import { ChapterModule } from './chapter/chapter.module';
import { PageModule } from './page/page.module';
import { FavoriteModule } from './favorite/favorite.module';
import { ProgressModule } from './progress/progress.module';
import { Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Module({
  imports: [AuthModule, MangaModule, CoverModule, ChapterModule, PageModule, FavoriteModule, ProgressModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
