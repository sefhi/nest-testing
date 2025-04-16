import { Uuid } from '../ValueObjects/Uuid';

export abstract class DomainEvent {
  static EVENT_NAME: string;
  static fromPrimitives: (
    aggregateId: string,
    eventId: string,
    occurredOn: Date,
    attributes: DomainEventAttributes,
  ) => DomainEvent;

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

export type DomainEventClass = {
  EVENT_NAME: string;
  fromPrimitives(
    relatedId: string,
    eventId: string,
    occurredOn: Date,
    attributes: DomainEventAttributes,
  ): DomainEvent;
};

type DomainEventAttributes = any;
