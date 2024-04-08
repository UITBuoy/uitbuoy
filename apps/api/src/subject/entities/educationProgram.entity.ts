import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class EducationProgram {
    @Field(() => String)
    @PrimaryGeneratedColumn()
    id: string;

    @Field(() => Number)
    @Column({ nullable: true })
    course: number;

    @Field(() => String)
    @Column()
    major: string; //enum

    @Field(() => String)
    @Column()
    trainingSystem: string; //enum

    @Field(() => String)
    @Column()
    title: string;

}
