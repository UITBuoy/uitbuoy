import { ArgsType, Field, registerEnumType } from '@nestjs/graphql';

@ArgsType()
export class LearningPathArgs {
    @Field(() => LearningPathOptionEnum, {
        description: 'The keyword to get suitable subject codes',
        nullable: false,
    })
    option: LearningPathOptionEnum; //later
}

export enum LearningPathOptionEnum {
    electiveSubjects = 'electiveSubjects',
    requiredSubjects = 'requiredSubjects',
}

registerEnumType(LearningPathOptionEnum, { name: 'LearningPathOptionEnum' });
