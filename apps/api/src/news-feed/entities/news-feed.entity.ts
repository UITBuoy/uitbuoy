import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryColumn,
    Relation,
} from 'typeorm';
import type { NewsFeedTag } from './news-feed-tag.entity';

@ObjectType()
@Entity()
export class NewsFeed {
    @Field()
    @PrimaryColumn()
    title: string;

    @Field(() => Float)
    @Column({ type: 'bigint' })
    date: number;

    @Field(() => Int)
    @Column()
    view: number;

    @Field()
    @Column()
    description: string;

    @Field()
    @Column()
    htmlContent: string;

    @Field()
    @Column()
    plainContent: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    imageUrl?: string;

    @ManyToMany('NewsFeedTag', 'newsFeeds')
    @JoinTable()
    tags: Relation<NewsFeedTag>;
}
