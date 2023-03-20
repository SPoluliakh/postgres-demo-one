import { registerAs } from '@nestjs/config/dist';
import { EnumConfig } from './enumConfig/enumCinfig';
import { pgConfig } from './postgres.config';

export const databaseConfig = registerAs(EnumConfig.DATABASE, () => ({
  pg: {
    ...pgConfig(),
  },
}));
