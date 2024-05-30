import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Message {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column()
    @Field(() => String)
    content: string;

    @Column()
    @Field(() => String)
    senderId: string;

    @Column()
    @Field(() => String)
    receiverId: string;

    @Column('timestamptz')
    @Field(() => Float)
    date: Date;
}

export class MessageDTO {
    content: string;
    senderId: string;
    receiverId: string;
}

@ObjectType()
export class Room {
    @Field(() => String)
    id: string;
}
