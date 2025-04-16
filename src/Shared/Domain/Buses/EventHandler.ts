import { DomainEvent, DomainEventClass } from '../Events/DomainEvent';

export interface EventHandler {
  subscribedTo(): Array<DomainEventClass>;
  handle(event: DomainEvent): Promise<void>;
}
