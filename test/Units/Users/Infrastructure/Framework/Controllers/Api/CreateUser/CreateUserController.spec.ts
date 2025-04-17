import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserController } from '../../../../../../../../src/Users/Infrastructure/Framework/Controllers/Api/CreateUser/CreateUserController';
import { CreateUserHandler } from '../../../../../../../../src/Users/Application/Commands/CreateUser/CreateUserHandler';
import { CreateUserDto } from '../../../../../../../../src/Users/Infrastructure/Framework/Controllers/Api/CreateUser/CreateUserDto';
import { UserEmailAlreadyExistsException } from '../../../../../../../../src/Users/Domain/Exceptions/UserEmailAlreadyExistsException';
import { ConflictException } from '@nestjs/common';
import { Uuid } from '../../../../../../../../src/Shared/Domain/ValueObjects/Uuid';

describe('CreateUserController', () => {
  let controller: CreateUserController;
  let handler: CreateUserHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateUserController],
      providers: [
        {
          provide: CreateUserHandler,
          useValue: {
            handle: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CreateUserController>(CreateUserController);
    handler = module.get<CreateUserHandler>(CreateUserHandler);
  });

  it('should create an user correctly', async () => {
    // GIVEN
    const dto: CreateUserDto = {
      id: Uuid.generate().toString(),
      email: 'test@example.com',
      name: 'Test User',
    };
    const handleSpy = jest
      .spyOn(handler, 'handle')
      .mockResolvedValue(undefined);

    // WHEN
    await controller.register(dto);

    // THEN
    expect(handleSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        id: dto.id,
        email: dto.email,
        name: dto.name,
      }),
    );
  });

  it('should throw an ConflictException when email already exist', async () => {
    // GIVEN
    const dto: CreateUserDto = {
      id: Uuid.generate().toString(),
      email: 'duplicate@example.com',
      name: 'Test User',
    };
    const exception = new UserEmailAlreadyExistsException(dto.email);
    jest.spyOn(handler, 'handle').mockRejectedValue(exception);

    // WHEN & THEN
    await expect(controller.register(dto)).rejects.toThrow(ConflictException);
    await expect(controller.register(dto)).rejects.toThrow(exception.message);
  });

  it('should throw other exceptions', async () => {
    // GIVEN
    const dto: CreateUserDto = {
      id: Uuid.generate().toString(),
      email: 'test@example.com',
      name: 'Test User',
    };
    const error = new Error('Unexpected error');
    jest.spyOn(handler, 'handle').mockRejectedValue(error);

    // WHEN & THEN
    await expect(controller.register(dto)).rejects.toThrow(error);
  });
});
