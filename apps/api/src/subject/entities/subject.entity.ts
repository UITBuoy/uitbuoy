import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Subject {
    @Field(() => String)
    @PrimaryColumn()
    code: string;

    @Field(() => String)
    @Column()
    nameVN: string;

    @Field(() => String)
    @Column()
    nameEN: string;

    @Field(() => Boolean)
    @Column()
    isActive: boolean;

    @Field(() => String)
    @Column()
    department: string;

    @Field(() => String)
    @Column()
    type: string;

    @Field(() => String, { nullable: true })
    @Column()
    oldeCode: string;

    @Field(() => String, { nullable: true })
    @Column()
    equivalentCode: string;

    @Field(() => String, { nullable: true })
    @Column()
    requiredCode: string;

    @Field(() => String, { nullable: true })
    @Column()
    previousCode: string;

    @Field(() => Int)
    @Column()
    theoreticalCredit: number;

    @Field(() => Int)
    @Column()
    practicalCredit: number;
}
