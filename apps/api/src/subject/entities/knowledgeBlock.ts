import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
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
export class KnowledgeBlock {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    groupBaseCredit: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    baseCredit: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    majorCredit: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    thesisCredit: number;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    majors: string;

    @ManyToOne('EducationProgram', 'knowledgeBlocks')
    @JoinColumn([
        { name: 'year_education', referencedColumnName: 'year' },
        { name: 'major_education', referencedColumnName: 'majorName' },
    ])
    educationProgram: Relation<EducationProgram>;
}
