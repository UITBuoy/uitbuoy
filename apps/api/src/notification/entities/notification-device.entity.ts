import type { User } from '@/user/entities/user.entity';
import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class NotificationDevice {
    @Field({ description: 'Push token' })
    @PrimaryColumn()
    token: string;

    @Field(() => Float, {
        description:
            'How many days should we notify the user before the event?',
        defaultValue: 1,
        nullable: true,
    })
    @Column({ type: 'float', default: 1, nullable: true })
    beforeDay: number;

    @Field(() => Float, {
        description: 'Date of the last notification',
        nullable: true,
    })
    @Column({ type: 'bigint', nullable: true })
    lastNotificationDate?: number;

    @ManyToOne('User', 'devices')
    user: User;
}
