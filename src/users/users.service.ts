import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ChangeUser } from './dto/change-user.dto';
import { CreateUser } from './dto/create-user.dto';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ where: { id } });
  }

  async createUser(newUser: CreateUser): Promise<User> {
    const user = new User();
    user.username = newUser.username;
    user.email = newUser.email;
    user.role = newUser.role;

    return user.save();
  }

  async updateUser(
    id: string,
    newData: ChangeUser,
  ): Promise<[affectedCount: number, affectedRows: User[]]> {
    return this.userModel.update(
      { ...newData },
      {
        where: { id },
        returning: true,
      },
    );
  }

  async removeUser(id: string): Promise<void> {
    const userToRemove = await this.findOne(id);
    await userToRemove.destroy();
  }
}