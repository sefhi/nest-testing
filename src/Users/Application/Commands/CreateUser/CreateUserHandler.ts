import { UserRepository } from '../../../Domain/Repositories/UserRepository';
import { CreateUserCommand } from './CreateUserCommand';
import { User } from '../../../Domain/Entities/User';
import { Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '../../../Domain/Repositories/UserRepository';

export class CreateUserHandler {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly repository: UserRepository,
  ) {}

  async handle(command: CreateUserCommand) {
    const user = User.create(command.id, command.email, command.name);

    await this.repository.store(user);
  }
}
