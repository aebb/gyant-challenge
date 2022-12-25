import {
  ConflictException, Inject, Injectable, NotFoundException, Logger,
} from '@nestjs/common';
import { ConditionRepositoryInterface } from '../repository/condition.repository.interface';
import { CaseRepositoryInterface } from '../repository/case.repository.interface';
import { CaseUpdateRequest } from '../dto/request/case.update.request';
import { CaseResponse } from '../dto/response/case.response';
import { ErrorMessages } from '../utils/error.messages';

@Injectable()
export class CaseService {
  public constructor(
    @Inject('ConditionRepository') private conditionRepository: ConditionRepositoryInterface,
    @Inject('CaseRepository') private caseRepository: CaseRepositoryInterface,
    private logger: Logger,
  ) {
  }

  public async findOpenCase(): Promise<CaseResponse> {
    const medicalCase = await this.caseRepository.findOldestOpenCase();
    if (!medicalCase) {
      this.logger.log(ErrorMessages.NO_CASES_OPEN);
      throw new NotFoundException(ErrorMessages.NO_CASES_OPEN);
    }

    return new CaseResponse(medicalCase);
  }

  public async updateOpenCase(command: CaseUpdateRequest): Promise<CaseResponse> {
    const medicalCase = await this.caseRepository.findById(command.getCaseId());
    if (!medicalCase) {
      this.logger.log(ErrorMessages.CASE_NOT_FOUND);
      throw new NotFoundException(ErrorMessages.CASE_NOT_FOUND);
    }

    if (!medicalCase.isOpen()) {
      this.logger.log(ErrorMessages.CASE_ALREADY_LABELED);
      throw new ConflictException(ErrorMessages.CASE_ALREADY_LABELED);
    }

    const condition = await this.conditionRepository.findById(command.getConditionId());
    if (!condition) {
      this.logger.log(ErrorMessages.CONDITION_NOT_FOUND);
      throw new NotFoundException(ErrorMessages.CONDITION_NOT_FOUND);
    }

    medicalCase.labelCase(command.getUser(), condition, command.getTimeToLabel());
    await this.caseRepository.update(medicalCase);

    return new CaseResponse(medicalCase);
  }
}
