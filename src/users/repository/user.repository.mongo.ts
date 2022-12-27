import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
    const model = await this.model.findOne({ username: email }).exec();
    if (!model) {
      return null;
    }
    return new User(model.toObject());
  }

  public async create(user: User): Promise<User> {
    const entity = new this.model(user);
    await entity.save();

    return new User(entity.toObject());
  }
}
