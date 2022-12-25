import { Condition } from '../entity/condition';

export interface ConditionRepositoryInterface {

  findById(id: string): Promise<Condition>
}
