import { Email } from '../../../Shared/Domain/ValueObjects/Email';
import { UserName } from '../ValueObjects/UserName';

export class User {
  private constructor(
    private readonly _id: string,
    private readonly _email: Email,
    private readonly _name: UserName,
  ) {}

  public static create(id: string, email: string, name: string): User {
    return new User(id, new Email(email), new UserName(name));
  }

  get id(): string {
    return this._id;
  }

  get email(): Email {
    return this._email;
  }

  get name(): UserName {
    return this._name;
  }
}
