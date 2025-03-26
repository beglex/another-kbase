import {Body, Controller, Post, Response} from '@nestjs/common';
import {serialize} from 'cookie';
import {Response as ExpressResponse} from 'express';

import {config} from '@root/configuration';
import {User} from '@root/entities';
import {UserService} from '@root/services';

const {session: {lifetime: maxAge}} = config;

@Controller('/api/users')
export class UserController {
    constructor(
        protected readonly service: UserService,
    ) {
    }

    @Post('signup')
    async signUp(
        @Body() body: Omit<User, 'id'>,
    ) {
        return this.service.signUp(body);
    }

    @Post('signin')
    async signIn(
        @Body() body: Pick<User, 'email' | 'password'>,
        @Response() response: ExpressResponse,
    ) {
        const result = await this.service.signIn(body) as User;

        response.removeHeader('Set-Cookie');
        response.header('Set-Cookie', serialize('token', User.sign(result), {maxAge, path: '/', sameSite: 'lax'}));

        response.send(result);
    }
}
