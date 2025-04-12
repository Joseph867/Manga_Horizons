import { Injectable } from '@nestjs/common';
import { CreateCoverDto } from './dto/create-cover.dto';
import { UpdateCoverDto } from './dto/update-cover.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CoverService {
  constructor(private prisma: PrismaService) {}

  create(createCoverDto: CreateCoverDto) {
    return this.prisma.cover.create({
       data:{
        filepath: createCoverDto.filepath,
        mangaId: createCoverDto.mangaId
       }
      });
  }

  findAll() {
    return this.prisma.cover.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} cover`;
  }

  update(id: number, updateCoverDto: UpdateCoverDto) {
    return `This action updates a #${id} cover`;
  }

  remove(id: number) {
    return `This action removes a #${id} cover`;
  }
}
