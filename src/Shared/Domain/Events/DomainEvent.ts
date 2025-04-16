import { Uuid } from '../ValueObjects/Uuid';

export abstract class DomainEvent {
  static EVENT_NAME: string;

  constructor(
    readonly relatedId: string,
    readonly eventId?: string,
    readonly occurredOn?: Date,
  ) {
    this.relatedId = relatedId;
    this.eventId = this.eventId || Uuid.generate().value;
    this.occurredOn = this.occurredOn || new Date();
  }

  abstract toPrimitives(): DomainEventAttributes;
}

type DomainEventAttributes = any;
