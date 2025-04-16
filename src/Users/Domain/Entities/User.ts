import { Email } from '../../../Shared/Domain/ValueObjects/Email';
import { UserName } from '../ValueObjects/UserName';
import { UserId } from '../ValueObjects/UserId';
import { BaseEntity } from '../../../Shared/Domain/Entities/BaseEntity';
import { UserCreated } from '../Events/UserCreated';

export class User extends BaseEntity {
  protected constructor(
    private readonly _id: UserId,
    private readonly _email: Email,
    private readonly _name: UserName,
  ) {
    super();
  }

  static create(id: string, email: string, name: string): User {
    const userId = new UserId(id);
    const userEmail = new Email(email);
    const userName = new UserName(name);
    const user = new User(userId, userEmail, userName);
    user.record(new UserCreated(userId.value, userName.value, userEmail.value));
    return user;
  }

  get id(): UserId {
    return this._id;
  }

  get email(): Email {
    return this._email;
  }

  get name(): UserName {
    return this._name;
  }
}
