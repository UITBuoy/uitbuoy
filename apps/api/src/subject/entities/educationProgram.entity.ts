import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryColumn, Relation } from 'typeorm';
import { KnowledgeBlock } from './knowledgeBlock';
import type { Section } from './section.entity';

@ObjectType()
@Entity()
export class EducationProgram {
    @Field()
    @PrimaryColumn()
    year: string;

    @Field()
    @PrimaryColumn()
    majorName: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    link: string;

    @Field(() => Int)
    @Column({ nullable: true })
    totalCredit: number;

    @Field(() => Int)
    @Column({ nullable: true })
    semesterNum: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    trainingSystem: string; //enum

    @OneToMany('Section', 'educationProgram', { cascade: true })
    sections: Relation<Section[]>;

    @OneToMany('KnowledgeBlock', 'educationProgram', { cascade: true })
    knowledgeBlocks: Relation<KnowledgeBlock[]>;
}
