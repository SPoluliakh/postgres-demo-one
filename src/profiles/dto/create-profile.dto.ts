import { IsNotEmpty } from 'class-validator';

export class CreateProfile {
  @IsNotEmpty()
  readonly firstname: string;

  @IsNotEmpty()
  readonly lastname: string;

  @IsNotEmpty()
  readonly state: string;
}
