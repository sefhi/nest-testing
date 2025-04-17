import { UserRepository } from '../../../../../../src/Users/Domain/Repositories/UserRepository';
import { User } from '../../../../../../src/Users/Domain/Entities/User';

export class MockUserRepository implements UserRepository {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findByEmail(email: string): Promise<User | null> {
    return Promise.resolve(null);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  store(user: User): Promise<void> {
    return Promise.resolve(undefined);
  }
}
