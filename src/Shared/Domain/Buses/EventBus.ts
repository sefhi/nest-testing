import { DomainEvent } from '../Events/DomainEvent';

export interface EventBus {
  publish(events: array<DomainEvent>): Promise<void>;
}