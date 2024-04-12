import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
    Column,
    Entity,
    OneToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    Relation,
} from 'typeorm';
import type { Section } from './section.entity';

@ObjectType()
@Entity()
export class EducationProgram {
    @Field(() => String)
    @PrimaryGeneratedColumn()
    id: string;

    @Field(() => String)
    @Column({ nullable: true })
    year: string;

    @Field(() => String)
    @Column()
    major: string; //enum

    @Field(() => String)
    @Column()
    trainingSystem: string; //enum

    @OneToMany('Section', 'educationProgram')
    sections: Relation<Section>[];
}
