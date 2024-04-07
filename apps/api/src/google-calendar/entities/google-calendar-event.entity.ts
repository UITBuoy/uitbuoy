import type { EventEntity } from '@/event/entities/event.entity';
import type { GoogleUser } from '@/user/entities/google-user.entity';
import { Field, Int, ObjectType, Float } from '@nestjs/graphql';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    Relation,
} from 'typeorm';

@ObjectType()
@Entity()
export class GoogleCalendarEvent {
    @Field()
    @PrimaryColumn()
    id: string;

    @Field(() => Float)
    @Column({ type: 'bigint' })
    lastSync: number;

    @ManyToOne('EventEntity')
    @JoinColumn({ name: 'event_id' })
    event: Relation<EventEntity>;

    @ManyToOne('GoogleUser')
    @JoinColumn({ name: 'google_user_id' })
    googleUser: Relation<GoogleUser>;
}
