import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import {
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    Relation,
} from 'typeorm';
import type { Event } from '../../event/entities/event.entity';

@ObjectType()
@Entity()
export class Calendar {
    @Field(() => String)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => User, { nullable: true })
    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne('Event')
    @JoinColumn({ name: 'event_id' })
    event: Relation<Event>;
}
