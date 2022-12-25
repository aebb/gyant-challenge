import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Case, CaseSchema } from './entity/case';
import { CaseController } from './controller/case.controller';
import { CaseRepositoryMongo } from './repository/case.repository.mongo';
import { ConditionRepositoryMongo } from './repository/condition.repository.mongo';
import { Condition, ConditionSchema } from './entity/condition';
import { CaseService } from './service/case.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Case.name, schema: CaseSchema },
      { name: Condition.name, schema: ConditionSchema },
    ]),
  ],
  controllers: [CaseController],
  providers: [
    Logger,
    CaseService,
    CaseRepositoryMongo,
    ConditionRepositoryMongo,
    {
      provide: 'CaseRepository',
      useClass: CaseRepositoryMongo,
    },
    {
      provide: 'ConditionRepository',
      useClass: ConditionRepositoryMongo,
    },
  ],
})
export class CasesModule {}
