import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TaskService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [TaskService],
})
export class TasksModule {}
