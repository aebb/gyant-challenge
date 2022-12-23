import { User } from '../entity/user';

export interface UserRepositoryInterface {

  findByEmail(email: string): Promise<User>
}
