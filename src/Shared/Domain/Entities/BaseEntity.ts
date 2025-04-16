import { DomainEvent } from '../Events/DomainEvent';

export class BaseEntity {
  private domainEvents: Array<DomainEvent>;

  protected constructor() {
    this.domainEvents = [];
  }

  pullDomainEvents(): Array<DomainEvent> {
    const events = this.domainEvents;
    this.domainEvents = [];
    return events;
  }

  record(domainEvent: DomainEvent) {
    this.domainEvents.push(domainEvent);
  }
}
