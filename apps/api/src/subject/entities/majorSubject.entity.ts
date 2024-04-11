import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Section } from './section.entity';

@ObjectType()
@Entity()
export class MajorSubject {
    @Field(() => String)
    @PrimaryColumn()
    code: string;

    @Field(() => Boolean)
    @Column()
    isRequired: boolean;

    @Field(() => Boolean)
    @Column()
    isFree: boolean;

    @Field(() => String)
    @Column()
    type: string;

    @Field(() => Int)
    @Column()
    theoreticalCredit: number;

    @Field(() => Int)
    @Column()
    practicalCredit: number;

    @Field(() => Int)
    @Column()
    minimumOptionalCredit: number;

    @Field(() => Section, { nullable: true })
    @ManyToOne(() => Section)
    @JoinColumn({ name: 'section_id' })
    section: Section;
}
