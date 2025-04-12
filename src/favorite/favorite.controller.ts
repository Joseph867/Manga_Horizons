import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  async addFavorite(@Body() body: { userId: number; mangaId: number}) {
    return this.favoriteService.addFavorite(body.userId, body.mangaId);
  }

  @Delete()
  async removeFavorite(@Body() body: {userId: number; mangaId: number}){
    return this.favoriteService.removeFavorite(body.userId, body.mangaId);
  }

  @Get(':userId')
  async getFavoritesByUser(@Param('userId') userId: number) {
    return this.favoriteService.getFavoritesByUser(userId);
  }


  @Post()
  create(@Body() createFavoriteDto: CreateFavoriteDto) {
    return this.favoriteService.create(createFavoriteDto);
  }

  @Get()
  findAll() {
    return this.favoriteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoriteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFavoriteDto: UpdateFavoriteDto) {
    return this.favoriteService.update(+id, updateFavoriteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoriteService.remove(+id);
  }
}
