import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { User } from '../entity/user';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'Local') {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  public async validate(email: string, password: string): Promise<User> {
    const user = await this.authService.getUserByCredentials(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
