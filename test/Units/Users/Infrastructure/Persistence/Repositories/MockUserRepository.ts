import { UserRepository } from '../../../../../../src/Users/Domain/Repositories/UserRepository';
import { User } from '../../../../../../src/Users/Domain/Entities/User';

export class MockUserRepository implements UserRepository {
  findByEmail(email: string): Promise<User | null> {
    return Promise.resolve(null);
  }

  store(user: User): Promise<void> {
    return Promise.resolve(undefined);
  }
}
