import {Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query} from '@nestjs/common';

import {Article} from '@root/entities';
import {ArticleService} from '@root/services';

@Controller('/api/articles')
export class ArticleController {
    constructor(
        protected readonly service: ArticleService,
    ) {
    }

    @Post()
    async create(
        @Body() body: Article,
    ) {
        return this.service.create(body);
    }

    @Get()
    get(
        @Query('tags') tags: string, // CSVs, e.g. '?tags=tag1,tag2' TODO add swagger and validation
    ) {
        return this.service.get(tags);
    }

    @Get(':id')
    getOne(
        @Param('id', ParseUUIDPipe) id: Article['id'],
    ) {
        return this.service.getOne(id);
    }

    @Patch(':id')
    async update(
        @Param('id', ParseUUIDPipe) id: Article['id'],
        @Body() body: Partial<Article>,
    ) {
        return this.service.update(id, body);
    }

    @Delete(':id')
    delete(
        @Param('id', ParseUUIDPipe) id: Article['id'],
    ) {
        return this.service.delete(id);
    }
}
