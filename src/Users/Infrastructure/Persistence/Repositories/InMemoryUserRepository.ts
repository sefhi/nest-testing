import { UserRepository } from '../../../Domain/Repositories/UserRepository';
import { User } from '../../../Domain/Entities/User';

export class InMemoryUserRepository implements UserRepository {
  findByEmail(email: string): Promise<User | null> {
    return Promise.resolve(undefined);
  }

  store(user: User): Promise<void> {
    return Promise.resolve(undefined);
  }
}
