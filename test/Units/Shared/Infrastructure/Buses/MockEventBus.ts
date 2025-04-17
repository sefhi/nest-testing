import { DomainEvent } from 'src/Shared/Domain/Events/DomainEvent';
import { EventBus } from '../../../../../src/Shared/Domain/Buses/EventBus';

export class MockEventBus implements EventBus {
  public publishedEvents: DomainEvent[] = [];
  publish(events: DomainEvent[]): Promise<void> {
    this.publishedEvents = [...this.publishedEvents, ...events];
    return Promise.resolve(undefined);
  }
}
