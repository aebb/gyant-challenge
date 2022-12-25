import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepositoryInterface } from '../repository/user.repository.interface';
import { User } from '../entity/user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'Jwt') {
  public constructor(
  @Inject('IgnoreTTL') ignore: boolean,
    @Inject('UserRepository') private userRepository: UserRepositoryInterface,
    @Inject('JWTSecret') jwtSecret: string,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwtSecret,
    });
  }

  public async validate(payload: any): Promise<User> {
    const user = await this.userRepository.findByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
