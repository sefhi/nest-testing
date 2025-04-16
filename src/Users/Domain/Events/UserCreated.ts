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
    occurredOn?: Date,
  ) {
    super(relatedId, occurredOn);
    this.name = name;
    this.email = email;
  }
  toPrimitives(): CreateUserDomainEventAttributes {
    return {
      name: this.name,
      email: this.email,
    };
  }
}
