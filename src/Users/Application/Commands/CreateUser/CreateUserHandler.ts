import { UserRepository } from '../../../Domain/Repositories/UserRepository';
import { CreateUserCommand } from './CreateUserCommand';
import { User } from '../../../Domain/Entities/User';

export class CreateUserHandler {
  constructor(private readonly repository: UserRepository) {}

  async handle(command: CreateUserCommand) {
    const user = User.create(command.id, command.email, command.name);

    await this.repository.store(user);
  }
}
