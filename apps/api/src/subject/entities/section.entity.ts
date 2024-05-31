import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    Relation,
} from 'typeorm';
import type { EducationProgram } from './educationProgram.entity';
import type { MajorSubject } from './majorSubject.entity';

@ObjectType()
@Entity()
export class Section {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    name: string;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    order: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    totalCredit: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    minimumCredit: number;

    @Field(() => Boolean, { nullable: true, defaultValue: false })
    @Column({ nullable: true, default: false })
    isOptional: boolean;

    @ManyToMany('MajorSubject', 'sections', { cascade: true })
    @JoinTable()
    subjects: Relation<MajorSubject[]>;

    @ManyToOne('EducationProgram', 'sections')
    @JoinColumn([
        { name: 'year_education', referencedColumnName: 'year' },
        { name: 'major_education', referencedColumnName: 'majorName' },
    ])
    educationProgram: Relation<EducationProgram>;
}
