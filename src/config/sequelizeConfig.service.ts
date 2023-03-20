import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SequelizeOptionsFactory } from '@nestjs/sequelize';
import { SequelizeModuleOptions } from '@nestjs/sequelize/dist';
import { User } from 'src/users/models/user.model';
import { EnumConfig } from './enumConfig/enumCinfig';

@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createSequelizeOptions(
    connectionName?: string,
  ): SequelizeModuleOptions | Promise<SequelizeModuleOptions> {
    const {
      pg: { dialect, logging, host, port, username, password, database },
    } = this.configService.get(EnumConfig.DATABASE);
    return {
      dialect,
      logging,
      host,
      port,
      username,
      password,
      database,
      models: [
        User,
        // Profile
      ],
      autoLoadModels: true,
      synchronize: true,
    };
  }
}
