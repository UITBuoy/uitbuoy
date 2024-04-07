import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryColumn, Relation } from 'typeorm';
import type { EventEntity } from './event.entity';

@ObjectType()
@Entity()
export class EventReminder {
    @Field()
    @PrimaryColumn({ generated: true })
    id: number;

    @ManyToOne('EventEntity', 'reminders')
    event: Relation<EventEntity>;

    @Field(() => Boolean, { nullable: true, defaultValue: false })
    @Column()
    isMute: boolean;

    @Field(() => Int, { nullable: true, defaultValue: 30 })
    @Column()
    minutes: number;
}
