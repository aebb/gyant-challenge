import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Condition, ConditionDocument } from '../entity/condition';
import { ConditionRepositoryInterface } from './condition.repository.interface';

@Injectable()
export class ConditionRepositoryMongo implements ConditionRepositoryInterface {
  public constructor(
    @InjectModel(Condition.name)
    private model: Model<ConditionDocument>,
  ) {

  }

  public async findById(id: string): Promise<Condition> {
    const model = await this.model.findOne({ _id: id }).exec();
    if (!model) {
      return null;
    }
    return new Condition(model.toObject());
  }
}
