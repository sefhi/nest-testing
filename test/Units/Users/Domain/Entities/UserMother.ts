import { User } from '../../../../../src/Users/Domain/Entities/User';

type UserParams = {
  id?: string;
  email?: string;
  name?: string;
};

export class UserMother {
  static random(overrides: UserParams = {}): User {
    const randomData = {
      id: 'xxxx-xxxx-xxxx-xxxx',
      email: 'example@example.com',
      name: 'John Doe',
    };

    const finalData = { ...randomData, ...overrides };

    return User.create(finalData.id, finalData.email, finalData.name);
  }
}
