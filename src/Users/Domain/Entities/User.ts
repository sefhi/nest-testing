import { Email } from '../../../Shared/Domain/ValueObjects/Email';
import { UserName } from '../ValueObjects/UserName';
import { UserId } from '../ValueObjects/UserId';
import { BaseEntity } from '../../../Shared/Domain/Entities/BaseEntity';

export class User extends BaseEntity {
  protected constructor(
    private readonly _id: UserId,
    private readonly _email: Email,
    private readonly _name: UserName,
  ) {
    super();
  }

  static create(id: string, email: string, name: string): User {
    return new User(new UserId(id), new Email(email), new UserName(name));
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
