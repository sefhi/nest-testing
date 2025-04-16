import { Uuid } from '../ValueObjects/Uuid';

export abstract class DomainEvent {
  static EVENT_NAME: string;

  readonly eventId: string;

  constructor(
    readonly relatedId: string,
    readonly occurredOn?: Date,
  ) {
    this.relatedId = relatedId;
    this.eventId = Uuid.generate().value;
    this.occurredOn = this.occurredOn || new Date();
  }

  abstract toPrimitives(): DomainEventAttributes;
}

type DomainEventAttributes = any;
