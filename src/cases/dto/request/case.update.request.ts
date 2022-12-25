import {
  IsInt, IsNotEmpty, IsObject, IsPositive, IsString, Matches,
} from 'class-validator';
import { Type } from 'class-transformer';
import { User } from '../../../users/entity/user';

export class CaseUpdateRequest {
  @IsNotEmpty()
  @IsString()
  @Matches('^[0-9a-fA-F]{24}$')
  private readonly id: string;

  @IsNotEmpty()
  @IsString()
  @Matches('^[0-9a-fA-F]{24}$')
  private readonly conditionId: string;

  @IsNotEmpty()
  @IsObject()
  private readonly user: User;

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  private readonly timeToLabel: number;

  public constructor(id: string, conditionId: string, user: User, timeToLabel: number) {
    this.id = id;
    this.conditionId = conditionId;
    this.user = user;
    this.timeToLabel = timeToLabel;
  }

  public getCaseId(): string {
    return this.id;
  }

  public getConditionId(): string {
    return this.conditionId;
  }

  public getTimeToLabel(): number {
    return this.timeToLabel;
  }

  public getUser(): User {
    return this.user;
  }
}
