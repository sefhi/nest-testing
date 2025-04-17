import { UserRepository } from '../../../../../../src/Users/Domain/Repositories/UserRepository';
import { User } from '../../../../../../src/Users/Domain/Entities/User';
import { Uuid } from '../../../../../../src/Shared/Domain/ValueObjects/Uuid';

export class MockUserRepository implements UserRepository {
  findByEmail(email: string): Promise<User | null> {
    return Promise.resolve(
      User.create(Uuid.generate().toString(), email, 'John Doe'),
    );
  }

  store(user: User): Promise<void> {
    const u = user;
    return Promise.resolve(undefined);
  }
}
