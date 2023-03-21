import { Table, Model, Column, HasOne } from 'sequelize-typescript';
import { Profile } from 'src/profiles/models/profile.model';

@Table
export class User extends Model {
  @Column
  username: string;

  @Column
  email: string;

  @Column
  role: string;

  @HasOne(() => Profile)
  profileld: Profile;
}
