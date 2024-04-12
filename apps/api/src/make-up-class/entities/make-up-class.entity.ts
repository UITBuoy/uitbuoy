import type { Course } from '@/course/entities/course.entity';
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
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
export class MakeUpClass {
    @Field({ description: 'Title of the notification' })
    @PrimaryColumn()
    title: string;

    @Field()
    @Column()
    courseCode: string;

    @Field()
    @Column()
    classId: string;

    @Field({ nullable: true, description: 'Classroom to learn' })
    @Column({ nullable: true })
    classroom: string;

    @Field(() => Int, { description: 'Tiết bắt đầu buổi học' })
    @Column()
    start: number;

    @Field(() => Int, { description: 'Tiết kết thúc buổi học' })
    @Column()
    end: number;

    @Field(() => Float, { description: 'Ngày học' })
    @Column({ type: 'bigint' })
    time: number;

    @Field(() => Float, {
        description: 'Created date of the make up class notification',
    })
    @Column({ type: 'bigint' })
    createdDate: number;
}
