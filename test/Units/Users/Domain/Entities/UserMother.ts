import { User } from '../../../../../src/Users/Domain/Entities/User';
import { CreateUserCommand } from '../../../../../src/Users/Application/Commands/CreateUser/CreateUserCommand';
import { v7 as uuidv7 } from 'uuid';

type UserParams = {
  id?: string;
  email?: string;
  name?: string;
};

export class UserMother {
  static random(overrides: UserParams = {}): User {
    const randomData = {
      id: uuidv7(),
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
