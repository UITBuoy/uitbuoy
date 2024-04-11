import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { MajorSubject } from './majorSubject.entity';
import { EducationProgram } from './educationProgram.entity';

@ObjectType()
@Entity()
export class Section {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => Number)
    @Column({ nullable: true })
    order: number;

    @Field(() => Number)
    @Column({ nullable: true })
    totalCredit: number;

    @Field(() => String)
    @Column()
    title: string; //enum

    @OneToMany('majorSubject', 'section')
    subjects: Relation<MajorSubject>[];

    @Field(() => EducationProgram, { nullable: true })
    @ManyToOne(() => EducationProgram)
    @JoinColumn({ name: 'educationProgram_id' })
    educationProgram: EducationProgram;
}
