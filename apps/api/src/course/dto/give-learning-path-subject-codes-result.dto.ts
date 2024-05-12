import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GiveLearningPathSubjectCodesResult {
    @Field(() => [String])
    electiveSubjects: string[];

    @Field(() => [String])
    requiredSubjects: string[];
}
