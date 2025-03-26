import {CanActivate, ExecutionContext, ForbiddenException, Injectable} from '@nestjs/common';

import {ApplicationRequest} from '@root/types';

@Injectable()
export class AuthorizationGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<ApplicationRequest>();
        if (!request.data?.isAuthorized) {
            throw new ForbiddenException('Access denied.');
        }
        return true;
    }
}
