import { UserRepository } from '../../../Domain/Repositories/UserRepository';
import { CreateUserCommand } from './CreateUserCommand';
import { User } from '../../../Domain/Entities/User';
import { Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '../../../Domain/Repositories/UserRepository';
import { EVENT_BUS, EventBus } from '../../../../Shared/Domain/Buses/EventBus';
import { Email } from '../../../../Shared/Domain/ValueObjects/Email';
import { UserEmailAlreadyExistsException } from '../../../Domain/Exceptions/UserEmailAlreadyExistsException';

export class CreateUserHandler {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly repository: UserRepository,
    @Inject(EVENT_BUS)
    private readonly eventBus: EventBus,
  ) {}

  async handle(command: CreateUserCommand) {
    const user = User.create(command.id, command.email, command.name);

    await this.ensureUserByEmailNotExist(user.email);

    await this.repository.store(user);

    await this.eventBus.publish(user.pullDomainEvents());
  }

  private async ensureUserByEmailNotExist(email: Email) {
    const user = await this.repository.findByEmail(email.toString());
    if (user !== null) {
      throw new UserEmailAlreadyExistsException(email.toString());
    }
  }
}
