import { User } from '../../../../../src/Users/Domain/Entities/User';
import { CreateUserCommand } from '../../../../../src/Users/Application/Commands/CreateUser/CreateUserCommand';
import { Uuid } from '../../../../../src/Shared/Domain/ValueObjects/Uuid';

type UserParams = {
  id?: string;
  email?: string;
  name?: string;
};

export class UserMother {
  static random(overrides: UserParams = {}): User {
    const randomData = {
      id: Uuid.generate().toString(),
      email: 'example@example.com',
      name: 'John Doe',
    };

    const finalData = { ...randomData, ...overrides };

    return User.create(finalData.id, finalData.email, finalData.name);
  }

  static fromCommand(command: CreateUserCommand): User {
    return this.random({
      id: command.id,
      email: command.email,
      name: command.name,
    } as UserParams);
  }
}
