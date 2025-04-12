// src/Users/users.module.ts
import { Module } from '@nestjs/common';
import { CreateUserController } from './CreateUser/CreateUserController';

@Module({
  controllers: [CreateUserController],
  providers: [],
})
export class UsersModule {}
