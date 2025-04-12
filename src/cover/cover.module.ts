import { Module } from '@nestjs/common';
import { CoverService } from './cover.service';
import { CoverController } from './cover.controller';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CoverController],
  providers: [CoverService, PrismaService],
})
export class CoverModule {}
