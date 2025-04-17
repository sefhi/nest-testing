import { Uuid } from '../../../../../src/Shared/Domain/ValueObjects/Uuid';
import { UserCreated } from '../../../../../src/Users/Domain/Events/UserCreated';
import { User } from '../../../../../src/Users/Domain/Entities/User';

type UserCreatedParams = {
  relatedId?: string;
  name?: string;
  email?: string;
  eventId?: string;
  occurredOn?: Date;
};

export class UserCreatedMother {
  static random(overrides: UserCreatedParams = {}): UserCreated {
    const randomData = {
      relatedId: Uuid.generate().toString(),
      name: 'John Doe',
      email: 'example@example.com',
      eventId: Uuid.generate().toString(),
      occurredOn: new Date(),
    };

    const finalData = { ...randomData, ...overrides };

    return new UserCreated(
      finalData.relatedId,
      finalData.name,
      finalData.email,
      finalData.eventId,
      finalData.occurredOn,
    );
  }

  static fromDomain(user: User): UserCreated {
    const [firstEvent] = user.pullDomainEvents();
    return firstEvent;
  }
}
