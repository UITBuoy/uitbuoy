import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Subject {
    @Field(() => String)
    @PrimaryColumn()
    code: string;

    @Field(() => String)
    @Column({ nullable: true })
    nameVN: string;

    @Field(() => String)
    @Column({ nullable: true })
    nameEN: string;

    @Field(() => Boolean)
    @Column({ nullable: true })
    isActive: boolean;

    @Field(() => String)
    @Column({ nullable: true })
    department: string;

    @Field(() => String)
    @Column({ nullable: true })
    type: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    oldCode: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    equivalentCode: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    requiredCode: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    previousCode: string;

    @Field(() => Int)
    @Column({ nullable: true })
    theoreticalCredit: number;

    @Field(() => Int)
    @Column({ nullable: true })
    practicalCredit: number;

    @Field(() => String, { nullable: true }) // Graphql
    @Column({ nullable: true })
    summary: string;

    @Field(() => Int)
    priority?: number;

    additionSubjects?: string[];
}
