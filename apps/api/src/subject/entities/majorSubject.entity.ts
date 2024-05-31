import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
    Column,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
    Relation
} from 'typeorm';
import { KnowledgeBlock } from './knowledgeBlock';
import type { Section } from './section.entity';

@ObjectType()
@Entity()
export class MajorSubject {
    @Field(() => String)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => String)
    @Column()
    code: string;

    @Field(() => Boolean, { nullable: true })
    @Column({ nullable: true })
    isRequired: boolean = false;

    @Field(() => Boolean, { nullable: true })
    @Column({ nullable: true })
    isFree: boolean;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    type: string;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    theoreticalCredit: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    practicalCredit: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    minimumOptionalCredit: number;

    @ManyToMany('Section', 'subjects')
    sections: Relation<Section[]>;

    @ManyToMany('KnowledgeBlock', 'subjects')
    knowledgeBlocks: Relation<KnowledgeBlock[]>;
}
