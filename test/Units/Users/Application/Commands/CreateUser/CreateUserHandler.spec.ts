import { CreateUserHandler } from '../../../../../../src/Users/Application/Commands/CreateUser/CreateUserHandler';
import { MockUserRepository } from '../../../../../../src/Users/Mocks/MockUserRepository';
import { CreateUserCommandMother } from './CreateUserCommandMother';
import { UserMother } from '../../../Domain/Entities/UserMother';

describe('CreateUserHandler', () => {
  let repository: MockUserRepository;

  beforeEach(() => {
    repository = new MockUserRepository();
  });

  it('should be defined', async () => {
    // GIVEN
    const command = CreateUserCommandMother.random();
    const userExpected = UserMother.fromCommand(command);
    const storeSpy = jest.spyOn(repository, 'store');

    // WHEN
    const handler = new CreateUserHandler(repository);
    await handler.handle(command);

    // THEN
    expect(handler).toBeDefined();
    expect(storeSpy).toHaveBeenCalledWith(userExpected);
  });
});
