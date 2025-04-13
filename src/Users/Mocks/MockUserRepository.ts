import { UserRepository } from '../Domain/Repositories/UserRepository';
import { User } from '../Domain/Entities/User';

export class MockUserRepository implements UserRepository {
  findByEmail(email: string): Promise<User | null> {
    return Promise.resolve(
      User.create('xxxx-xxxx-xxxx-xxxx', email, 'John Doe'),
    );
  }

  store(user: User): Promise<void> {
    return Promise.resolve(undefined);
  }
}
