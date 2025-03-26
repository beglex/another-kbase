import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Raw, Repository} from 'typeorm';

import {Article} from '@root/entities';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article)
        protected readonly repo: Repository<Article>,
    ) {
    }

    async create(body: Omit<Article, 'id'>) {
        return this.repo.save(body);
    }

    async getOne(id: Article['id']) {
        return this.repo.findOne({where: {id}});
    }

    async get(tags = '') {
        if (tags) {
            return this.repo.find(
                {where: {tags: Raw(alias => `${alias} && ARRAY[:...tags]::varchar[]`, {tags: tags.split(',')})}});
        }

        return this.repo.find();
    }

    async update(id: Article['id'], body: Partial<Article>) {
        const article = await this.getOne(id);
        if (!article) {
            throw new NotFoundException(`${Article.name} does not exist`);
        }

        await this.repo.update(id, {...article, ...body});

        return this.getOne(id);
    }

    async delete(id: Article['id']) {
        const entity = await this.getOne(id);
        if (!entity) {
            throw new NotFoundException(`${Article.name} does not exist`);
        }

        await this.repo.delete(id);

        return entity;
    }
}
