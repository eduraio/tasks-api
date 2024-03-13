import { SetMetadata } from '@nestjs/common';
import { UserPermissions } from '@prisma/client';

export const RequiredPermissions = (...permissions: UserPermissions[]) =>
  SetMetadata('permissions', permissions);
