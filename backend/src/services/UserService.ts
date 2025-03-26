import {Injectable, UnauthorizedException} from '@nestjs/common';
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

    async create(body: Omit<User, 'id'>) {
        if (body.password) {
            body.password = User.hashPassword(body.password);
        }

        return this.repo.save(body);
    }

    async getOne(id: User['id']) {
        return this.repo.findOne({where: {id}});
    }

    async get() {
        return this.repo.find();
    }

    async signIn({email, password}: Partial<User>) {
        const user = await this.repo.findOne({where: {email}});

        if (User.hashPassword(password) !== user?.password) {
            throw new UnauthorizedException(User.name);
        }

        return this.getOne(user.id);
    }
}
