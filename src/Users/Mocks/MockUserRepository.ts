import { UserRepository } from '../Domain/Repositories/UserRepository';
import { User } from '../Domain/Entities/User';
import { Uuid } from '../../Shared/Domain/ValueObjects/Uuid';

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
