import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseInterceptors, UploadedFile, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MangaService } from './manga.service';
import { CreateMangaDto } from './dto/create-manga.dto';
import { UpdateMangaDto } from './dto/update-manga.dto';
import { PrismaClient } from '@prisma/client';
import { Express } from 'express';
import { Response } from 'express';

const prisma = new PrismaClient();

@Controller('manga')
export class MangaController {
  constructor(private readonly mangaService: MangaService) { }

  @Post('upload/:mangaId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCover(
    @UploadedFile() file: Express.Multer.File,
    @Param('mangaId') mangaId: number
  ) {
    if (!file) {
      throw new BadRequestException('Nincs fájl feltöltve!');
    }

    try {
      // Ellenőrizd, hogy van-e már cover a megadott mangaId-hoz
      const existingCover = await prisma.cover.findUnique({
        where: { mangaId: Number(mangaId) },
      });

      if (existingCover) {
        // Ha már létezik, előbb töröld
        await prisma.cover.delete({
          where: { mangaId: Number(mangaId) },
        });
      }

      // Új borító mentése
      const savedCover = await prisma.cover.create({
        data: {
          hash: 'hash-placeholder',
          data: file.buffer,
          mimeType: file.mimetype,
          mangaId: Number(mangaId),
        },
      });

      return { message: 'Fájl elmentve!', cover: savedCover };
    } catch (error) {
      console.error('Adatbázis hiba:', error);
      throw new InternalServerErrorException('Nem sikerült a kép mentése!');
    }
  }


  @Get(':mangaId')
  async getCover(@Param('mangaId') mangaId: number, @Res() res: Response) {
    const cover = await this.mangaService.getCover(Number(mangaId))
    if (!cover) {
      return res.status(404).send({ message: 'cover not found' });
    }
    res.setHeader('Content-Type', cover.mimeType)
    res.send(cover.data)
  }

  @Get()
  findAll() {
    return this.mangaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mangaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMangaDto: UpdateMangaDto) {
    return this.mangaService.update(+id, updateMangaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mangaService.remove(+id);
  }
}
