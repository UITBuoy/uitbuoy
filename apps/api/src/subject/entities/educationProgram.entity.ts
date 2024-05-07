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

    @Field({ nullable: true })
    @Column({ nullable: true })
    trainingSystem: string; //enum

    @OneToMany('Section', 'educationProgram', { cascade: true })
    sections: Relation<Section[]>;
}
