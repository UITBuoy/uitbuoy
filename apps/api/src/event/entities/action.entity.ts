import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Action {
    @Field(() => String)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => String)
    @Column()
    name: string;

    @Field(() => String)
    @Column()
    url: string;

    @Field(() => Int)
    @Column()
    itemcount: number;

    @Field(() => Boolean)
    @Column()
    actionable: Boolean;

    @Field(() => Boolean)
    @Column()
    showitemcount: Boolean;
}
