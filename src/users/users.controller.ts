import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Header,
  Patch,
  Delete,
} from '@nestjs/common';
import { ChangeUser } from './dto/change-user.dto';
import { CreateUser } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  getOneUser(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Contante-type', 'application/json')
  createUser(@Body() newUser: CreateUser) {
    return this.userService.createUser(newUser);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() userToUpdate: ChangeUser) {
    return this.userService.updateUser(id, userToUpdate);
  }

  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.userService.removeUser(id);
  }
}
