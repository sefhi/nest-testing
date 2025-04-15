import { User } from '../Entities/User';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface UserRepository {
  store(user: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
}
