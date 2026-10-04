import { applyDecorators, UseGuards } from '@nestjs/common';
import { Roles } from './roles.decorator.js';
import { AuthGuard } from '../guards/auth.guard.js';
import { RolesGuard } from '../guards/roles.guard.js';
import { ROLES } from '../constans/roles.constans.js';

export const Auth = (...roles: ROLES[]) => {
  roles.push(ROLES.Admin); 
  return applyDecorators(
    Roles(roles),
    UseGuards(AuthGuard, RolesGuard),
  );
};