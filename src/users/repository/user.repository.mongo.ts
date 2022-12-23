import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { instanceToInstance, plainToClass } from 'class-transformer';
import { User, UserDocument } from '../entity/user';
import { UserRepositoryInterface } from './user.repository.interface';

@Injectable()
export class UserRepositoryMongo implements UserRepositoryInterface {
  public constructor(
    @InjectModel(User.name)
    private model: Model<UserDocument>,
  ) {

  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.model.findOne({ username: email }).exec();
    // return instanceToInstance(user);
    return new User(user.toObject());
  }
}
