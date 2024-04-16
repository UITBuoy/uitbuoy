import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    PrimaryColumn,
    Relation,
} from 'typeorm';
import type { Section } from './section.entity';

@ObjectType()
@Entity()
export class MajorSubject {
    @Field(() => String)
    @PrimaryColumn()
    code: string;

    @Field(() => Boolean, { nullable: true })
    @Column({ nullable: true })
    isRequired: boolean;

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
}
