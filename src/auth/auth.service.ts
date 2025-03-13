import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { randomBytes } from 'crypto';
import { PrismaService } from 'src/prisma.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as argon2 from 'argon2';

async function hashPassword(password: string){
  try {
    const hash = await argon2.hash(password);
  
    return hash;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

@Injectable()
export class AuthService {
  constructor (private readonly db: PrismaService  ) {}
  
  async generateTokenFor(user: User) {
    let expiration = new Date(Date.now() + 1000 * 60 * 60 * 24); // 1 day in milliseconds
    const randomBuffer = randomBytes(32);
    const randomString = randomBuffer.toString('hex');

    await this.db.token.create({
      data: {
        token: randomString,
        userId: user.id,
        expiration: expiration,
      },
    });
    console.log("generating token for: ", user);
    return randomString;
  }
  
  async findUserByToken(token: string) {
    const tokenObj = await this.db.token.findUnique({
      where: { token }
    })
    if (tokenObj == null) {
      return null;
    }
    return await this.db.user.findUniqueOrThrow({
      where: { id: tokenObj.userId }
    })
  }

  async tokenCleanup() {
    await this.db.token.deleteMany({
      where: {
        expiration: {
          lt: new Date()
        }
      }
    })  
  }

  findByProfilename(profilename: string) {
    return this.db.user.findUnique({
      where: { profilename}
    })
  }
  create(CreateAuthDto: CreateAuthDto) {
   
  }

  async registration(createAuthDto: CreateAuthDto) {
    try {
      const user = await this.findByProfilename(createAuthDto.profilename);
      if (user) {
        throw new HttpException('Ez az név már foglalt!', HttpStatus.BAD_REQUEST);
      }
    
    const hashedPassword = await hashPassword(createAuthDto.password);
    return this.db.user.create({
      data: {
        email: createAuthDto.email,
        profilename: createAuthDto.profilename,
        password: hashedPassword,
      }
    })
  }catch (err) {
    console.log(err.message)
    throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }} 

  findAll() {
    return `This action returns all users`;
  }
}