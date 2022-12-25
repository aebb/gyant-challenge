import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRepositoryInterface } from '../repository/user.repository.interface';
import { User } from '../entity/user';
import { JWTAuthResponse } from '../dto/response/jwt.auth.response';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserRepository') private userRepository: UserRepositoryInterface,
    private jwtService: JwtService,
  ) {
  }

  public async login(user: User): Promise<JWTAuthResponse> {
    const payload = { username: user.getEmail() };
    return new JWTAuthResponse(this.jwtService.sign(payload));
  }

  public async getUserByCredentials(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (user && await bcrypt.compare(password, user.getPassword())) {
      return user;
    }

    return null;
  }
}
