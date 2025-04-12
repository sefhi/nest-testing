import { Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('api/v1/users')
export class CreateUserController {
  @Post()
  @HttpCode(HttpStatus.CREATED)
  register() {
    // Registration logic goes here
  }
}
