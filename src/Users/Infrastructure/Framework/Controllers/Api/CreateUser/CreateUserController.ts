import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  ConflictException,
} from '@nestjs/common';
import { CreateUserDto } from './CreateUserDto';
import { CreateUserHandler } from '../../../../../Application/Commands/CreateUser/CreateUserHandler';
import { CreateUserCommand } from '../../../../../Application/Commands/CreateUser/CreateUserCommand';
import { UserEmailAlreadyExistsException } from '../../../../../Domain/Exceptions/UserEmailAlreadyExistsException';

@Controller('api/v1/users')
export class CreateUserController {
  constructor(private readonly createUserHandler: CreateUserHandler) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const command = new CreateUserCommand(
        createUserDto.id,
        createUserDto.email,
        createUserDto.name,
      );
      await this.createUserHandler.handle(command);
    } catch (e) {
      if (e instanceof UserEmailAlreadyExistsException) {
        throw new ConflictException(e.message);
      }
      throw e;
    }
  }
}
