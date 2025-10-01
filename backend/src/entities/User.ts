import {createHmac} from 'node:crypto';

import {Exclude} from 'class-transformer';
import {IsEmail} from 'class-validator';
import {sign} from 'jsonwebtoken';
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

import {config} from '@root/configuration';

const {session: {lifetime: exp, secret}} = config;

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    @IsEmail()
    email: string;

    @Column()
    @Exclude({toPlainOnly: true})
    password?: string;

    static hashPassword(password: User['password'] = '') {
        return createHmac('sha256', password).digest('hex');
    }

    static sign({id, email}: Pick<User, 'id' | 'email'>) {
        return sign({id, email, exp}, secret);
    }
}
