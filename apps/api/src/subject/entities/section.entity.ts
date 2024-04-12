import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    Relation,
} from 'typeorm';
import type { MajorSubject } from './majorSubject.entity';
import type { EducationProgram } from './educationProgram.entity';

@ObjectType()
@Entity()
export class Section {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => Number)
    @Column({ nullable: true })
    order: number;

    @Field(() => Number)
    @Column({ nullable: true })
    totalCredit: number;

    @Field(() => String)
    @Column()
    title: string; //enum

    @OneToMany('MajorSubject', 'section')
    subjects: Relation<MajorSubject>[];

    @ManyToOne('EducationProgram', 'sections')
    @JoinColumn({ name: 'education_program_id' })
    educationProgram: EducationProgram;
}
