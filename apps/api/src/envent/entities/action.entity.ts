import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

@ObjectType()
@Entity()
export class Action {
    @Field(() => UUID)
    @PrimaryGeneratedColumn('uuid')
    id: UUID;

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
