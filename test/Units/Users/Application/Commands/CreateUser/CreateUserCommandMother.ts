import { CreateUserCommand } from '../../../../../../src/Users/Application/Commands/CreateUser/CreateUserCommand';
import { v7 } from 'uuid';
import { Uuid } from '../../../../../../src/Shared/Domain/ValueObjects/Uuid';

type CommandParams = {
  id?: string;
  email?: string;
  name?: string;
};

export class CreateUserCommandMother {
  static random(overrides: CommandParams = {}): CreateUserCommand {
    const randomData = {
      id: Uuid.generate().toString(),
      email: 'example@example.com',
      name: 'John Doe',
    };

    const finalData = { ...randomData, ...overrides };

    return new CreateUserCommand(finalData.id, finalData.email, finalData.name);
  }
}
