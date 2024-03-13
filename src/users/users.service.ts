import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export const hashRounds = 7;

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  includeFields = {
    tasks: true,
  } satisfies Prisma.UserInclude;

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      hashRounds,
    );

    createUserDto.password = hashedPassword;
    return this.prismaService.user.create({
      data: createUserDto,
      include: this.includeFields,
    });
  }

  findAll() {
    return this.prismaService.user.findMany({ include: this.includeFields });
  }
  findOne(id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
      include: this.includeFields,
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        hashRounds,
      );
    }
    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
      include: this.includeFields,
    });
  }

  remove(id: string) {
    return this.prismaService.user.delete({ where: { id } });
  }
}
