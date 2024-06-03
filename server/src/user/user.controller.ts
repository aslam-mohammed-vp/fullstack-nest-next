import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

@Controller('user')
export class UserController {
  logger: Logger;
  constructor(private readonly usersService: UserService) {
    this.logger = new Logger(UserController.name);
  }

  @Post('/signup')
  async addUser(
    @Body('fullname') fullname: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const result = await this.usersService.createUser(
      fullname,
      email,
      hashedPassword,
    );
    return {
      msg: 'User successfully registered',
      userId: result.id,
      userName: result.email,
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req): any {
    return { user: req.user, msg: 'User logged in' };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/protected')
  getHello(@Request() req): string {
    return req.user;
  }

  @Get('/logout')
  logout(@Request() req): any {
    req.session.destroy();
    return { msg: 'The user session has ended' };
  }
}
