import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepositoryInterface } from '../repository/user.repository.interface';
import { User } from '../entity/user';

@Injectable()
export class AuthService {
  constructor(@Inject('UserRepository') private userRepository: UserRepositoryInterface) {
  }

  public async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (user && await bcrypt.compare(password, user.getPassword())) {
      return user;
    }

    return null;
  }
}
