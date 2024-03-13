import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserPermissions } from '@prisma/client';
import { IsEmail } from 'class-validator';

export class UserEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  password: string;

  @ApiPropertyOptional({
    isArray: true,
    enum: UserPermissions,
    example: Object.keys(UserPermissions),
  })
  permissions?: UserPermissions[];

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
