// src/Users/users.module.ts
import { Module } from '@nestjs/common';
import { CreateUserController } from './CreateUser/CreateUserController';
import { CreateUserHandler } from '../../../../Application/Commands/CreateUser/CreateUserHandler';

@Module({
  controllers: [CreateUserController],
  providers: [CreateUserHandler],
})
export class UsersModule {}
