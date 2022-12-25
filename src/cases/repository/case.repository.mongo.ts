import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Case, CaseDocument } from '../entity/case';
import { CaseRepositoryInterface } from './case.repository.interface';

@Injectable()
export class CaseRepositoryMongo implements CaseRepositoryInterface {
  public constructor(
    @InjectModel(Case.name)
    private model: Model<CaseDocument>,
  ) {

  }

  public async findById(id: string): Promise<Case> {
    const model = await this.model.findOne({ _id: id }).exec();
    if (!model) {
      return null;
    }
    return new Case(model.toObject());
  }

  public async findOldestOpenCase(): Promise<Case> {
    const model = await this.model.findOne({ condition: null }).sort({ createdAt: 1 }).exec();
    if (!model) {
      return null;
    }
    return new Case(model.toObject());
  }

  public async update(entity: Case): Promise<Case> {
    await this.model.findByIdAndUpdate(
      { _id: entity.getId() },
      {
        timeToLabel: entity.getTime(),
        condition: entity.getCondition(),
        doctor: entity.getDoctor(),
      },
    );

    return entity;
  }
}
