import { UserRepository } from '../../../Domain/Repositories/UserRepository';
import { User } from '../../../Domain/Entities/User';
import { Email } from '../../../../Shared/Domain/ValueObjects/Email';

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  findByEmail(email: string): Promise<User | null> {
    const emailObject = new Email(email);
    const user = this.users.find((u) => u.email.equals(emailObject));
    return Promise.resolve(user || null);
  }

  store(user: User): Promise<void> {
    const existingIndex = this.users.findIndex((u) => u.id === user.id);

    if (existingIndex >= 0) {
      this.users[existingIndex] = user;
    } else {
      this.users.push(user);
    }
    return Promise.resolve(undefined);
  }
}
