import { TimeStampBaseEntity } from '@/common/entities/timestamp-base-entity';
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
import type { EventEntity } from '../../event/entities/event.entity';

@ObjectType()
@Entity()
export class NoteEntity extends TimeStampBaseEntity {
    @Field()
    @PrimaryColumn({ generated: 'uuid' })
    id: string;

    @Field(() => String)
    @Column()
    title: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    description: string;

    @ManyToOne('EventEntity', 'notes')
    @JoinColumn({ name: 'event_id' })
    event: Relation<EventEntity>;

    @ManyToOne('User', 'notes')
    @JoinColumn({ name: 'user_id' })
    user: Relation<User>;
}
