import { DomainEvent } from '../../../Shared/Domain/Events/DomainEvent';

type CreateUserDomainEventAttributes = {
  readonly name: string;
  readonly email: string;
};

export class UserCreated extends DomainEvent {
  static readonly EVENT_NAME = 'UserCreated';

  readonly name: string;
  readonly email: string;
  constructor(
    relatedId: string,
    name: string,
    email: string,
    eventId?: string,
    occurredOn?: Date,
  ) {
    super(relatedId, eventId, occurredOn);
    this.name = name;
    this.email = email;
  }
  toPrimitives(): CreateUserDomainEventAttributes {
    return {
      name: this.name,
      email: this.email,
    };
  }

  static fromPrimitives(
    relatedId: string,
    attributes: CreateUserDomainEventAttributes,
    eventId: string,
    occurredOn: Date,
  ) {
    return new UserCreated(
      relatedId,
      name: attributes.name,
      email: attributes.email,
      eventId,
      occurredOn
    );
  }
}
