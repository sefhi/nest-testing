import { DomainEvent } from '../Events/DomainEvent';

export interface EventHandler {
  subscribedTo() : Array<DomainEventClass>
  handler(event: DomainEvent): Promise<void>;
}