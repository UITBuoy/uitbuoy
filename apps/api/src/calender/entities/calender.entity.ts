import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import {
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Event } from '../../envent/entities/event.entity';

@ObjectType()
@Entity()
export class Calender {
    @Field(() => String)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => User, { nullable: true })
    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Field(() => Event, { nullable: true })
    @ManyToOne(() => Event)
    @JoinColumn({ name: 'event_id' })
    event: Event;
}
