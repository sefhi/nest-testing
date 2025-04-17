import { EventHandler } from '../../../../Shared/Domain/Buses/EventHandler';
import {
  DomainEvent,
  DomainEventClass,
} from '../../../../Shared/Domain/Events/DomainEvent';
import { UserCreated } from '../../../Domain/Events/UserCreated';
import {
  EMAIL_SENDER,
  EmailSender,
} from '../../../../Shared/Domain/Emails/EmailSender';
import { Inject } from '@nestjs/common';

export class SendMailUserCreatedWelcomeHandler implements EventHandler {
  constructor(
    @Inject(EMAIL_SENDER)
    private readonly emailSender: EmailSender,
  ) {}

  async handle(event: DomainEvent): Promise<void> {
    const userCreatedEvent = event as UserCreated;

    await this.emailSender.send(
      userCreatedEvent.email,
      'Welcome to Leadtech',
      `Hello ${userCreatedEvent.name}, thanks for registering on our site.<br>Regards, Leadtech Team`,
    );

    return Promise.resolve(undefined);
  }

  subscribedTo(): Array<DomainEventClass> {
    return [UserCreated];
  }
}
