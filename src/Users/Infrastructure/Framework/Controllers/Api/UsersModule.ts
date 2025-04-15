import { Module } from '@nestjs/common';
import { CreateUserController } from './CreateUser/CreateUserController';
import { CreateUserHandler } from '../../../../Application/Commands/CreateUser/CreateUserHandler';
import { InMemoryUserRepository } from '../../../Persistence/Repositories/InMemoryUserRepository';
import { USER_REPOSITORY } from '../../../../Domain/Repositories/UserRepository';

@Module({
  controllers: [CreateUserController],
  providers: [
    CreateUserHandler,
    {
      provide: USER_REPOSITORY,
      useClass: InMemoryUserRepository,
    },
  ],
})
export class UsersModule {}
