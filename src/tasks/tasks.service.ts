import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private prismaService: PrismaService) {}

  includeFields = {
    created_by_user: {
      select: {
        email: true,
        permissions: true,
      },
    },
  } satisfies Prisma.TaskInclude;

  create(createTaskDto: CreateTaskDto, user_id: string) {
    return this.prismaService.task.create({
      data: {
        ...createTaskDto,
        created_by_user_id: user_id,
      },
      include: this.includeFields,
    });
  }

  findAll() {
    return this.prismaService.task.findMany({ include: this.includeFields });
  }
  findOne(id: string) {
    return this.prismaService.task.findUnique({
      where: { id },
      include: this.includeFields,
    });
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.prismaService.task.update({
      where: { id },
      data: updateTaskDto,
      include: this.includeFields,
    });
  }

  remove(id: string) {
    return this.prismaService.task.delete({ where: { id } });
  }
}
