import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    Relation,
} from 'typeorm';
import type { NewsFeedFile } from './news-feed-file';
import type { NewsFeedTag } from './news-feed-tag.entity';

@ObjectType()
@Entity()
export class NewsFeed {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column()
    title: string;

    @Field(() => Float)
    @Column({ type: 'bigint' })
    date: number;

    @Field(() => Int, { nullable: true, defaultValue: 0 })
    @Column({ nullable: true, default: 0 })
    view?: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    description?: string;

    @Field()
    @Column()
    htmlContent: string;

    @Field()
    @Column()
    plainContent: string;

    @Field()
    @Column()
    link: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    imageUrl?: string;

    @ManyToMany('NewsFeedTag', 'newsFeeds')
    @JoinTable()
    tags: Relation<NewsFeedTag>;

    @OneToMany('NewsFeedFile', 'newsFeed', { cascade: true })
    files: Relation<NewsFeedFile[]>;
}
