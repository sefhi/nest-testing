import { User } from '../Entities/User';

export interface UserRepository {
  store(user: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
}
