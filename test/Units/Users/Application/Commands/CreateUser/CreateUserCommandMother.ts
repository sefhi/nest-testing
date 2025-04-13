import { CreateUserCommand } from '../../../../../../src/Users/Application/Commands/CreateUser/CreateUserCommand';

type CommandParams = {
  id?: string;
  email?: string;
  name?: string;
};

export class CreateUserCommandMother {
  static random(overrides: CommandParams = {}): CreateUserCommand {
    const randomData = {
      id: 'xxxx-xxxx-xxxx-xxxx',
      email: 'example@example.com',
      name: 'John Doe',
    };

    const finalData = { ...randomData, ...overrides };

    return new CreateUserCommand(finalData.id, finalData.email, finalData.name);
  }
}
