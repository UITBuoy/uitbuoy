import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Assignment {
    @Field(() => Int, { nullable: true })
    @PrimaryColumn()
    id: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    cmid: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    course: number;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    name: string;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    allowsubmissionsfromdate: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    duedate: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    timemodified: number;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    intro: string;
}
