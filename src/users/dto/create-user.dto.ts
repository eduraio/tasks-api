import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserPermissions } from '@prisma/client';
import { IsEmail, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty()
  @IsString()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @ApiPropertyOptional({
    isArray: true,
    enum: UserPermissions,
    example: Object.keys(UserPermissions),
  })
  @IsOptional()
  permissions?: UserPermissions[];
}
