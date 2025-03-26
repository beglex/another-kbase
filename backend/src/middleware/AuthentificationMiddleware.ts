import {Injectable, Logger, NestMiddleware, UnauthorizedException} from '@nestjs/common';
import {parse} from 'cookie';
import {NextFunction} from 'express';
import {JwtPayload, verify} from 'jsonwebtoken';

import {config} from '@root/configuration';
import {User} from '@root/entities';
import {UserService} from '@root/services';
import {ApplicationRequest, ApplicationResponse} from '@root/types';

const {session: {secret}} = config;

type AuthenticationPayload = JwtPayload & Pick<User, 'id' | 'email'>;

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
    private logger = new Logger(AuthenticationMiddleware.name);

    constructor(
        private readonly userService: UserService,
    ) {
    }

    async use(
        request: ApplicationRequest,
        _: ApplicationResponse,
        next: NextFunction,
    ) {
        const {token = ''} = parse(request.headers.cookie || '');

        let decoded: AuthenticationPayload;
        try {
            decoded = verify(token, secret, {ignoreExpiration: true}) as AuthenticationPayload;
        } catch {
            this.logger.warn(`Wrong token: '${token}'`);
            return next();
        }

        const user = await this.userService.findOne({where: {id: decoded.id}});
        if (!user) {
            this.logger.warn('User not found', {id: decoded.id});
            throw new UnauthorizedException();
        }

        request.data ??= {};
        request.data.isAuthorized = !!user;

        return next();
    }
}
