import {
    Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query, Request, UseGuards,
} from '@nestjs/common';

import {Article} from '@root/entities';
import {AuthorizationGuard} from '@root/guards';
import {ArticleService} from '@root/services';
import {ApplicationRequest} from '@root/types';

@Controller('/api/articles')
export class ArticleController {
    constructor(
        protected readonly service: ArticleService,
    ) {
    }

    @Post()
    @UseGuards(AuthorizationGuard)
    async create(
        @Body() body: Article,
    ) {
        return this.service.create(body);
    }

    @Get()
    get(
        @Query('tags') tags: string, // CSVs, e.g. '?tags=tag1,tag2' TODO add swagger and validation
        @Request() request: ApplicationRequest,
    ) {
        return this.service.get(tags, request.data?.isAuthorized);
    }

    @Get(':id')
    @UseGuards(AuthorizationGuard)
    getOne(
        @Param('id', ParseUUIDPipe) id: Article['id'],
    ) {
        return this.service.getOne(id);
    }

    @Patch(':id')
    @UseGuards(AuthorizationGuard)
    async update(
        @Param('id', ParseUUIDPipe) id: Article['id'],
        @Body() body: Partial<Article>,
    ) {
        return this.service.update(id, body);
    }

    @Delete(':id')
    @UseGuards(AuthorizationGuard)
    delete(
        @Param('id', ParseUUIDPipe) id: Article['id'],
    ) {
        return this.service.delete(id);
    }
}
