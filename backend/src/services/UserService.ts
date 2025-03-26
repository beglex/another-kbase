import {ConflictException, Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

import {User} from '@root/entities';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        protected readonly repo: Repository<User>,
    ) {
    }

    async signUp(body: Omit<User, 'id'>) {
        const existing = await this.repo.findOne({where: {email: body.email}});
        if (existing) {
            throw new ConflictException(User.name);
        }

        if (body.password) {
            body.password = User.hashPassword(body.password);
        }

        return this.repo.save(body);
    }

    async signIn({email, password}: Partial<User>) {
        const existing = await this.repo.findOne({where: {email}});

        if (User.hashPassword(password) !== existing?.password) {
            throw new UnauthorizedException(User.name);
        }

        return this.repo.findOne({where: {id: existing.id}});
    }
}
