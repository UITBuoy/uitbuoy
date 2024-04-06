import { Field, ObjectType } from '@nestjs/graphql';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    Relation,
} from 'typeorm';
import type { User } from './user.entity';

@ObjectType()
@Entity()
export class GoogleUser {
    @Field()
    @PrimaryColumn()
    id: string;

    @Field()
    @Column()
    familyName: string;

    @Field()
    @Column()
    givenName: string;

    @Field()
    @Column()
    email: string;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    photo: string;

    @ManyToOne('User', 'googleUsers')
    @JoinColumn({ name: 'user' })
    user: Relation<User>;
}
