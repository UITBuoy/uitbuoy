import { Field, ObjectType } from '@nestjs/graphql';
import {
    Column,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
    Relation,
} from 'typeorm';
import type { NewsFeed } from './news-feed.entity';

@ObjectType()
@Entity()
export class NewsFeedTag {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column()
    name: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    description: string;

    @ManyToMany('NewsFeed', 'tags')
    newsFeeds: Relation<NewsFeed[]>;
}
