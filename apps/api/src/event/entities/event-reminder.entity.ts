import type { User } from '@/user/entities/user.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    Relation,
} from 'typeorm';
import type { EventEntity } from './event.entity';

@ObjectType()
@Entity()
export class EventReminder {
    @Field()
    @PrimaryColumn({ generated: true })
    id: number;

    @ManyToOne('EventEntity', 'reminders')
    @JoinColumn({ name: 'event_id' })
    event: Relation<EventEntity>;

    @ManyToOne('User', 'reminders')
    @JoinColumn({ name: 'user_id' })
    user: Relation<User>;

    @Field(() => Boolean, { nullable: true, defaultValue: false })
    @Column()
    isMute: boolean;

    @Field(() => Int, { nullable: true, defaultValue: 30 })
    @Column()
    minutes: number;

    constructor(isMute: boolean, minutes: number) {
        this.isMute = isMute;
        this.minutes = minutes;
    }
}
