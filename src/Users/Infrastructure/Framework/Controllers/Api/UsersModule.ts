import { Module } from '@nestjs/common';
import { CreateUserController } from './CreateUser/CreateUserController';
import { CreateUserHandler } from '../../../../Application/Commands/CreateUser/CreateUserHandler';
import { USER_REPOSITORY } from '../../../../Domain/Repositories/UserRepository';
import { PostgresUserRepository } from '../../../Persistence/Repositories/PostgresUserRepository';
import { Pool } from 'pg';
import { EventHandlersModule } from '../../../../../Shared/Infrastruture/Framework/Config/Events/EventHandlersModule';

@Module({
  imports: [EventHandlersModule],
  controllers: [CreateUserController],
  providers: [
    CreateUserHandler,
    {
      provide: 'PG_CONNECTION',
      useFactory: () => {
        return new Pool({
          host: process.env.DB_HOST || 'database',
          port: Number(process.env.DB_PORT) || 5432,
          user: process.env.DB_USER || 'app',
          password: process.env.DB_PASSWORD || '!ChangeMe!',
          database: process.env.DB_NAME || 'app',
        });
      },
    },
    {
      provide: USER_REPOSITORY,
      useFactory: (pool: Pool) => {
        return new PostgresUserRepository(pool);
      },
      inject: ['PG_CONNECTION'],
    },
  ],
})
export class UsersModule {}
