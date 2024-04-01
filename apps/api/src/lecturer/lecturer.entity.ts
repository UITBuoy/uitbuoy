import { Course } from '@/course/entities/course.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryColumn,
    Relation,
} from 'typeorm';

@ObjectType()
@Entity()
export class Lecturer {
    @Field()
    @PrimaryColumn()
    id: number;

    @Field()
    @Column()
    fullname: string;

    @Field()
    @Column()
    email: string;

    @Field()
    @Column()
    firstaccess: number;

    @Field()
    @Column()
    lastaccess: number;

    @Field()
    @Column()
    profileimageurlsmall: string;

    @Field()
    @Column()
    profileimageurl: string;

    @ManyToMany('Course', 'contacts')
    @JoinTable()
    courses: Relation<Course>;
}
