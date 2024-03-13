import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TaskService } from './tasks.service';
import { TaskEntity } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequiredPermissions } from 'src/auth/decorators/permissions.decorator';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { UserPermissions } from '@prisma/client';
import { RequestWithUser } from 'src/auth/decorators/request-param.decorator';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @RequiredPermissions(UserPermissions.CREATE_TASKS)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: TaskEntity })
  async create(
    @Req() request: RequestWithUser,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.taskService.create(createTaskDto, request.user.id);
  }

  @Get()
  @RequiredPermissions(UserPermissions.READ_TASKS)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: TaskEntity, isArray: true })
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  @RequiredPermissions(UserPermissions.READ_TASKS)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: TaskEntity })
  async findOne(@Param('id') id: string) {
    const task = await this.taskService.findOne(id);

    if (!task) throw new NotFoundException(`Task Not Found (${id})`);

    return task;
  }

  @Patch(':id')
  @RequiredPermissions(UserPermissions.UPDATE_TASKS)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: TaskEntity })
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @RequiredPermissions(UserPermissions.DELETE_TASKS)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
