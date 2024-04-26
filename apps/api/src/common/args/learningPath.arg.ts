import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class LearningPathArgs {
    @Field(() => Boolean, {
        nullable: true,
        defaultValue: false,
        description:
            'If true, fetch the new data from Moodle API, else query from the database',
    })
    isNew?: boolean;

    @Field({ nullable: true, description: 'The keyword to find suitable subject' })
    keyword?: string; //later
}
