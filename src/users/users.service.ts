import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ChangeUser } from './dto/change-user.dto';
import { CreateUser } from './dto/create-user.dto';
import { User } from './models/user.model';
import { Profile } from 'src/profiles/models/profile.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async findAll(): Promise<User[]> {
    return this.userModel.findAll({
      include: [Profile],
    });
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({
      where: { id },
      include: [Profile],
    });
  }

  async findByRole(role: string): Promise<User[]> {
    const users = await this.userModel.findAll({
      where: { role },
      include: [Profile],
    });

    if (!users || !users.length) {
      throw new Error(`No users found with role ${role}`);
    }
    return users;
  }

  async createUser(newUser: CreateUser): Promise<User> {
    const user = new User();
    user.username = newUser.username;
    user.email = newUser.email;
    user.role = newUser.role;
    await user.save();

    const profile = new Profile();
    profile.firstname = newUser.firstname;
    profile.lastname = newUser.lastname;
    profile.state = newUser.state;
    profile.userId = user.id;
    await profile.save();

    return user;
  }

  async updateUser(
    id: string,
    newData: ChangeUser,
  ): Promise<[affectedCount: number, affectedRows: User[]]> {
    const user = await this.userModel.findByPk(id, { include: [Profile] });

    await user.update({
      username: newData.username,
      email: newData.email,
      role: newData.role,
    });

    if (user.profileld) {
      await user.profileld.update({
        firstname: newData.firstname,
        lastname: newData.lastname,
        state: newData.state,
      });
    }

    return [1, [user]];
  }

  async removeUser(id: string): Promise<void> {
    const userToRemove = await this.findOne(id);
    await userToRemove.destroy();
  }
}
