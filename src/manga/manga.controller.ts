import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe} from '@nestjs/common';
import { MangaService } from './manga.service';
import { CreateMangaDto } from './dto/create-manga.dto';
import { UpdateMangaDto } from './dto/update-manga.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Controller('manga')
export class MangaController {
  constructor(private readonly mangaService: MangaService) { }

  @Get()
  findAll() {
    return this.mangaService.findAll();
  }

  @Get('all')
  async getAllManga() {
    return prisma.manga.findMany({
      include: {
        cover: true,
        chapters: true,
      }
    })
  }

  @Get(':id')
  async getMangaById(@Param('id') id: string) {
    return prisma.manga.findUnique({
      where: { id: parseInt(id)},
      include: {
        cover: true, 
        chapters: true,
      }
    })
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mangaService.findOne(+id);
  }

  @Get(':id')
  async getManga(@Param('id', ParseIntPipe) id: number) {
    // return this.mangaService.getmanga(id);
  }

  @Post('create')
  create(@Body() createMangaDto: CreateMangaDto) {
    return this.mangaService.create(createMangaDto);
  }

  @Post('cover')
  findAllByCover() {
    return this.mangaService.findAllByCover();
  }

  @Post('chapters/:mangaId')
  findAllChapters(@Param('mangaId') mangaId: string) {
    return this.mangaService.findAllChapters(+mangaId);
  }

  @Post('pages/:chapterId')
  findAllPages(@Param('chapterId') chapterId: string) {
    return this.mangaService.findAllPages(+chapterId);
  }

}
