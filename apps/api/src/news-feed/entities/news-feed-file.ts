import { Field, ObjectType } from '@nestjs/graphql';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    Relation,
} from 'typeorm';
import type { NewsFeed } from './news-feed.entity';

@ObjectType()
@Entity()
export class NewsFeedFile {
    @Field()
    @PrimaryColumn()
    url: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    title: string;

    @ManyToOne('NewsFeed', 'files')
    @JoinColumn({ name: 'news_feed_id' })
    newsFeed: Relation<NewsFeed>;
}
