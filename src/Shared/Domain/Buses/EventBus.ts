import { DomainEvent } from '../Events/DomainEvent';

export const EVENT_BUS = 'EVENT_BUS';

export interface EventBus {
  publish(events: DomainEvent[]): Promise<void>;
}
