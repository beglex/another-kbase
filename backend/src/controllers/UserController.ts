import {Body, Controller, Get, Param, ParseUUIDPipe, Post} from '@nestjs/common';

import {User} from '@root/entities';
import {UserService} from '@root/services';

@Controller('/api/users')
export class UserController {
    constructor(
        protected readonly service: UserService,
    ) {
    }

    @Post()
    async create(
        @Body() body: User,
    ) {
        return this.service.create(body);
    }

    @Get()
    get() {
        return this.service.get();
    }

    @Get(':id')
    getOne(
        @Param('id', ParseUUIDPipe) id: User['id'],
    ) {
        return this.service.getOne(id);
    }
}
