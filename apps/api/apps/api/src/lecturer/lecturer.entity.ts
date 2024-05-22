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

    @Field({ nullable: true })
    @Column({ nullable: true })
    fullname: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    email: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    firstaccess: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    lastaccess: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    profileimageurlsmall: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    profileimageurl: string;

    @ManyToMany('Course', 'contacts', { cascade: true })
    @JoinTable()
    courses: Relation<Course>;
}
