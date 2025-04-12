import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Post()
  async saveProgress(@Body() body: { userId: number; mangaId: number; chapterId: number}) {
    const { userId, mangaId, chapterId} = body;
    return this.progressService.upsert({
      where: { userId_mangaId: { userId, mangaId } },
      update: { chapterId },
      create: { userId, mangaId, chapterId },
    })
  }

  @Get(':userId')
  async getProgress(@Param('userId') userId: string) {
    return this.progressService.findMany({
      where: { userId: parseInt(userId)},
      include: {
        manga: true,
        chapter: true,
      }
    })
  }

  @Get(':userId/last')
  async getLastProgress(@Param('userId') userId: string) {
    return this.progressService.findLastProgress(parseInt(userId))
  }


  @Post('create')
  create(@Body() createProgressDto: CreateProgressDto) {
    return this.progressService.create(createProgressDto);
  }

  @Get()
  findAll() {
    return this.progressService.findAll();
  }

  @Get('entry/:id')
  findOne(@Param('id') id: string) {
    return this.progressService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgressDto: UpdateProgressDto) {
    return this.progressService.update(+id, updateProgressDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.progressService.remove(+id);
  }
}
