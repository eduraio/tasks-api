import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { providePrismaClientExceptionFilter } from 'nestjs-prisma';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    TasksModule,
    AuthModule,
  ],
  controllers: [],
  providers: [providePrismaClientExceptionFilter()],
})
export class AppModule {}
