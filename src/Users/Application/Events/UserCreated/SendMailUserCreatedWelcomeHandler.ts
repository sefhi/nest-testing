import { EventHandler } from '../../../../Shared/Domain/Buses/EventHandler';
import {
  DomainEvent,
  DomainEventClass,
} from '../../../../Shared/Domain/Events/DomainEvent';
import { UserCreated } from '../../../Domain/Events/UserCreated';

export class SendMailUserCreatedWelcomeHandler implements EventHandler {
  handle(event: DomainEvent): Promise<void> {
    const userCreatedEvent = event as UserCreated;
    console.log(
      `Usuario creado: ${userCreatedEvent.name} (${userCreatedEvent.email})`,
    );

    return Promise.resolve(undefined);
  }

  subscribedTo(): Array<DomainEventClass> {
    return [UserCreated];
  }
}
