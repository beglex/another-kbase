import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {FindOptionsWhere, Raw, Repository} from 'typeorm';

import {Article} from '@root/entities';
import {ArticleType} from '@root/types';

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

    async get(tags = '', isAuthorized = false) {
        const where: Partial<FindOptionsWhere<Article>> = {};
        if (tags) {
            where.tags = Raw(alias => `${alias} && ARRAY[:...tags]::varchar[]`, {tags: tags.split(',')});
        }
        if (!isAuthorized) {
            where.type = ArticleType.PUBLIC;
        }

        return this.repo.find({where});
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
