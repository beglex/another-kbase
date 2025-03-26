import {IsArray, IsEnum, IsOptional, IsString} from 'class-validator';
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

import {ArticleType} from '@root/types';

@Entity('article')
export class Article {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @IsString()
    header: string;

    @Column({nullable: true})
    @IsString()
    @IsOptional()
    content: string;

    @Column({type: 'varchar', array: true})
    @IsArray()
    tags: string[];

    @Column({default: ArticleType.PRIVATE})
    @IsEnum(ArticleType)
    type: ArticleType;
}
