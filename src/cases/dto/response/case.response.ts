import { Case } from '../../entity/case';

export class CaseResponse {
  private readonly _id?: string;

  private readonly electronicHealthRecord?: string;

  private readonly doctor?: string;

  private readonly condition?: string;

  private readonly timeToLabel?: number;

  public constructor(medicalCase: Case) {
    this._id = medicalCase.getId();
    this.electronicHealthRecord = medicalCase.getHealthRecord();
    this.doctor = medicalCase.getDoctor()?.getEmail();
    this.condition = medicalCase.getCondition()?.getCode();
    this.timeToLabel = medicalCase.getTime();
  }
}
