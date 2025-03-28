import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateMangaDto } from './dto/create-manga.dto';
import { UpdateMangaDto } from './dto/update-manga.dto';
import { Express } from 'express';


@Injectable()
export class MangaService {
  constructor(private prisma: PrismaService) {}

  async uploadCover(mangaId: number, file: Express.Multer.File) {
    const cover =  await this.prisma.cover.upsert({
      where: { mangaId: mangaId },
      update: {
        data: file.buffer,
        hash: 'some-hash',
        mimeType: file.mimetype,
      },
      create: {
        manga: { connect: { id: mangaId}},
        data: file.buffer,
        hash: 'some-hash',
        mimeType: file.mimetype,
      }
    })
    return { message: 'Fájl elmentve!', cover };
  }

  async getCover(mangaId: number) {
    return this.prisma.cover.findUnique({
      where: { mangaId },
    })
  }

  create(createMangaDto: CreateMangaDto) {
    return this.prisma.manga.create({ data: createMangaDto });
  }

  findAll() {
    return this.prisma.manga.findMany();
  }

  findOne(id: number) {
    return this.prisma.manga.findUnique({ where: { id }});
  }

  update(id: number, updateMangaDto: UpdateMangaDto) {
    return this.prisma.manga.update({ where: { id }, data: updateMangaDto});
  }

  remove(id: number) {
    return this.prisma.manga.delete({ where: { id }});
  }
}
