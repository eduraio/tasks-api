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
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequiredPermissions } from 'src/auth/decorators/permissions.decorator';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { UserPermissions } from '@prisma/client';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @RequiredPermissions(UserPermissions.CREATE_USERS)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return {
      ...user,
      password: undefined,
    };
  }

  @Get()
  @RequiredPermissions(UserPermissions.READ_USERS)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async findAll() {
    const users = await this.userService.findAll();

    return users.map((user) => {
      return {
        ...user,
        password: undefined,
      };
    });
  }

  @Get(':id')
  @RequiredPermissions(UserPermissions.READ_USERS)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);

    if (!user) throw new NotFoundException(`User Not Found (${id})`);

    return {
      ...user,
      password: undefined,
    };
  }

  @Patch(':id')
  @RequiredPermissions(UserPermissions.UPDATE_USERS)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.update(id, updateUserDto);
    return {
      ...user,
      password: undefined,
    };
  }

  @Delete(':id')
  @RequiredPermissions(UserPermissions.DELETE_USERS)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    const user = await this.userService.remove(id);
    return {
      ...user,
      password: undefined,
    };
  }
}
