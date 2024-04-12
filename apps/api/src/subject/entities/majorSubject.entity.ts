import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, Relation } from 'typeorm';
import type { Section } from './section.entity';

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

    @ManyToOne('Section', 'subjects')
    @JoinColumn({ name: 'section_id' })
    section: Relation<Section>;
}
