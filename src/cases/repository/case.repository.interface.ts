import { Case } from '../entity/case';

export interface CaseRepositoryInterface {

  findById(id: string): Promise<Case>
  findOldestOpenCase(): Promise<Case>
  update(entity: Case): Promise<Case>;
}
