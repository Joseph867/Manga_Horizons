import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateMangaDto } from './dto/create-manga.dto';
import { UpdateMangaDto } from './dto/update-manga.dto';


@Injectable()
export class MangaService {
  constructor(private prisma: PrismaService) {}

  create(createMangaDto: CreateMangaDto) {
    return this.prisma.manga.create({ data: createMangaDto });
  }

  async getmanga(mangaId: number) {
    return this.prisma.manga.findUnique({
      where: { id: mangaId},
      include: {
        cover: true,
        chapters: {
          include: {
            pages: true,
          }
        }
      }
    })
  }

  findAll() {
    return this.prisma.manga.findMany({
        include: {
          cover: true,
        }
    });
  } 

  findAllByCover() {
    return this.prisma.manga.findMany();
  }

  findAllChapters(mangaId: number) {
    return this.prisma.chapter.findMany({ where: { mangaId }});
  }

  findAllPages(chapterId: number) {
    return this.prisma.page.findMany({ where: { chapterId: chapterId }});
  }

  findOne(id: number) {
    return this.prisma.manga.findUnique({ where: { id }});
  }
}
