import {
  Table,
  Model,
  Column,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/users/models/user.model';

@Table
export class Profile extends Model {
  @Column
  firstname: string;

  @Column
  lastname: string;

  @Column
  state: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
