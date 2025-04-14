import { IsEmail, IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class CreateUserDto {
  @IsUUID()
  public readonly id: string;
  @IsEmail()
  public readonly email: string;
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  public readonly name: string;
}
