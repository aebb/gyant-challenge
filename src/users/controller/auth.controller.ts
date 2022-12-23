import {
  Controller, Get, Post, UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
  @Post('signin')
  @UseGuards(AuthGuard('Local'))
  public async executeLogin(): Promise<void> {

  }

  @Get('signout')
  public async executeLogout(): Promise<void> {

  }
}
