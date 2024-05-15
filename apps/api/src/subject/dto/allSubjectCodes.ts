import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AllSubjectCodeByMajorResult {
    @Field(() => [String])
    majorSubjectCodes: string[];

    @Field(() => [String])
    requiredSubjectCodes: string[];

    @Field(() => [String])
    electiveSubjectCodes: string[];
}
