import { Injectable } from '@nestjs/common';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class ProgressService {
  constructor(private readonly prisma: PrismaService) { }

  async upsert(data: { where: { userId_mangaId: { userId: number; mangaId: number } }; update: any; create: any }) {
    return this.prisma.progress.upsert({
      where: data.where,
      update: data.update,
      create: data.create,
    })
  }

  async findMany(params: { where: { userId: number }; include: any }) {
    return this.prisma.progress.findMany({
      where: params.where,
      include: params.include,

    })
  }

  async findLastProgress(userId: number) {
    return this.prisma.progress.findMany({
      where: { userId },
      include: {
        manga: true,
        chapter: true,
      },
      orderBy: {
        updateAt: 'desc',
      },
      take: 1,
    }
    )
  }

  async create(createProgressDto: CreateProgressDto) {
    return this.prisma.progress.create({
      data: createProgressDto,
    });
  }

  async findAll() {
    return this.prisma.progress.findMany({
      include: {
        manga: true,
        chapter: true,
      }
    });
  }

  async findOne(id: number) {
    return this.prisma.progress.findUnique({
      where: { id },
      include: {
        manga: true,
        chapter: true,
      }
    });
  }

  async update(id: number, updateProgressDto: UpdateProgressDto) {
    return this.prisma.progress.update({
      where: { id },
      data: updateProgressDto,
    });
  }

  async remove(id: number) {
    return this.prisma.progress.delete({
      where: { id },
    });
  }
}
