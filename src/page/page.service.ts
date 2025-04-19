import { Injectable } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PageService {
  constructor(private prisma: PrismaService) {}

  create(createPageDto: CreatePageDto) {
    return this.prisma.page.create({ data: createPageDto });
  }

  findAll() {
    return this.prisma.page.findMany();
  }

  async findByChapterId(chapterId: number) {
    return this.prisma.page.findMany({
      where: { chapterId: Number(chapterId)},
      orderBy: { id: 'asc'}
    })
  }

  findOne(id: number) {
    return this.prisma.page.findUnique({
      where: { id: id },
    });
  }

  update(id: number, updatePageDto: UpdatePageDto) {
    return `This action updates a #${id} page`;
  }

  remove(id: number) {
    return `This action removes a #${id} page`;
  }
}
