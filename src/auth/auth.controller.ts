import { Controller, Get, Post, Body, Request, UseGuards, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { verify } from 'argon2';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { logindto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  //This endpoint is for the user to login
  @Post('login')
  async login(@Body() loginDto: logindto) {
    const user = await this.authService.findByProfilename(loginDto.profilename);
    if (await user == null) {
      throw new UnauthorizedException('Hibás email vagy jelszó!');
    }
    if (!await verify(user.password, loginDto.password)) {
      throw new UnauthorizedException('Hibás email vagy jelszó!');
    }
    return {
      token: await this.authService.generateTokenFor(user),
      profilename: user.profilename,
      userId : user.id,
    }
  }
  @Post('/regist')
  async create(@Body() createUserDto: CreateAuthDto) {
   try {
     const generatedUser = await this.authService.registration(createUserDto);
     return {
        token: await this.authService.generateTokenFor(generatedUser),
        profilename: generatedUser.profilename,
        userId: generatedUser.id,

     }
   } catch (error) {
     console.log(error);
     throw new UnauthorizedException(error.message);
    }
  }

  @Get('Auth')
  @UseGuards(AuthGuard('bearer'))
  me(@Request() req) {
    const user: User = req.user;
    console.log("Authorizing: ", user);
    this.authService.tokenCleanup();
    return {
      email: user.email,
      profilename: user.profilename,
    }
  }
}