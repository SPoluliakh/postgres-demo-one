import { IsNotEmpty } from 'class-validator';

export class CreateUser {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly role: string;
}
