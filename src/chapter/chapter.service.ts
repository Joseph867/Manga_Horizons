import { Injectable } from '@nestjs/common';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ChapterService {
  constructor(private prisma: PrismaService) {}

  create(createChapterDto: CreateChapterDto) {
    return this.prisma.chapter.create ({ data: createChapterDto });
  }

  findAll() {
    return `This action returns all chapter`;
  }

  async findByMangaId(mangaId: number) {
    return this.prisma.chapter.findMany({
      where: { mangaId: Number(mangaId) },
      include: {
        manga: true
      },
      orderBy: { id: 'asc'}
    })
  }

  findOne(id: number) {
    return this.prisma.chapter.findUnique({
      where: { id: id},
      include: {
        pages: true,
    }});
  }

  update(id: number, updateChapterDto: UpdateChapterDto) {
    return `This action updates a #${id} chapter`;
  }

  remove(id: number) {
    return `This action removes a #${id} chapter`;
  }
}
