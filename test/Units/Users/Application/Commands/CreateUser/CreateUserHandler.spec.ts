import { CreateUserHandler } from '../../../../../../src/Users/Application/Commands/CreateUser/CreateUserHandler';
import { MockUserRepository } from '../../../Infrastructure/Persistence/Repositories/MockUserRepository';
import { CreateUserCommandMother } from './CreateUserCommandMother';
import { UserMother } from '../../../Domain/Entities/UserMother';
import { MockEventBus } from '../../../../Shared/Infrastructure/Buses/MockEventBus';

describe('CreateUserHandler', () => {
  let repository: MockUserRepository;
  let eventBus: MockEventBus;

  beforeEach(() => {
    repository = new MockUserRepository();
    eventBus = new MockEventBus();
  });

  it('should create an user and publish an event', async () => {
    // GIVEN
    const command = CreateUserCommandMother.random();
    const userExpected = UserMother.fromCommand(command);
    const storeSpy = jest.spyOn(repository, 'store');
    const eventBusSpy = jest.spyOn(eventBus, 'publish');
    const findByEmailSpy = jest
      .spyOn(repository, 'findByEmail')
      .mockResolvedValue(null);

    // WHEN
    const handler = new CreateUserHandler(repository, eventBus);
    await handler.handle(command);

    // THEN
    expect(handler).toBeDefined();

    expect(findByEmailSpy).toHaveBeenCalledWith(userExpected.email.toString());

    const storedUser = storeSpy.mock.calls[0][0];
    expect(storedUser).toMatchObject({
      id: { value: userExpected.id.value },
      email: { value: userExpected.email.value },
      name: { value: userExpected.name.value },
    });

    expect(eventBusSpy).toHaveBeenCalledWith([
      expect.objectContaining({
        email: userExpected.email.value,
        name: userExpected.name.value,
        relatedId: userExpected.id.value,
      }),
    ]);
  });
});
