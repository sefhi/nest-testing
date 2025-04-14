import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { CreateUserDto } from './CreateUserDto';
import { CreateUserHandler } from '../../../../../Application/Commands/CreateUser/CreateUserHandler';
import { CreateUserCommand } from '../../../../../Application/Commands/CreateUser/CreateUserCommand';

@Controller('api/v1/users')
export class CreateUserController {
  constructor(private readonly createUserHandler: CreateUserHandler) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto) {
    const command = new CreateUserCommand(
      createUserDto.id,
      createUserDto.email,
      createUserDto.name,
    );
    await this.createUserHandler.handle(command);
  }
}
