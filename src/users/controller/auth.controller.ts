import {
  Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../service/auth.service';
import { JwtAuthGuard } from '../utils/jwt.guard';
import { JWTAuthResponse } from '../dto/response/jwt.auth.response';

@Controller()
export class AuthController {
  public constructor(
    private authService: AuthService,
  ) {
  }

  @Post('signin')
  @UseGuards(AuthGuard('Local'))
  @HttpCode(HttpStatus.OK)
  public async executeLogin(@Req() request): Promise<JWTAuthResponse> {
    return this.authService.login(request.user);
  }

  @Get('signout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  public async executeLogout(): Promise<void> {
    // todo: invalidate token
  }
}
