import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FavoriteService {

  constructor(private prisma: PrismaService) {}

  async addFavorite(userId: number, mangaId: number){
    const userExists = await this.prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!userExists) {
      throw new Error('User not found')
    }

    return this.prisma.favorite.create({
      data: {
        userId: Number(userId),
        mangaId: Number(mangaId),
      }
    })
  }

  async removeFavorite(userId: number, mangaId: number) {
    return this.prisma.favorite.deleteMany({
      where: {
        userId,
        mangaId,
      }
    })
  }

  async getFavoritesByUser(userId: number) {
    return this.prisma.favorite.findMany({
      where: {
        userId: Number(userId),
      },
      include: {
        manga: {
          include: {
            cover: true,
          }
        }
      }
    })
  }


  create(createFavoriteDto: CreateFavoriteDto) {
    return 'This action adds a new favorite';
  }

  findAll() {
    return `This action returns all favorite`;
  }

  findOne(id: number) {
    return `This action returns a #${id} favorite`;
  }

  update(id: number, updateFavoriteDto: UpdateFavoriteDto) {
    return `This action updates a #${id} favorite`;
  }

  remove(id: number) {
    return `This action removes a #${id} favorite`;
  }
}
