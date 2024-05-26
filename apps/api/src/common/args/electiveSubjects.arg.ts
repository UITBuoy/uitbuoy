import {
    ArgsType,
    Field,
    InputType,
    ObjectType,
    registerEnumType,
} from '@nestjs/graphql';

@InputType()
export class ElectiveSubjectsArgs {
    @Field(() => String, {
        description: 'The keyword to get suitable subject codes',
        nullable: true,
    })
    name: string;

    @Field(() => String, {
        description: 'The keyword to get suitable subject codes',
        nullable: true,
    })
    credits: string;
}

@ArgsType()
export class ElectiveObjectArgs {
    @Field(() => [ElectiveSubjectsArgs], {
        description: 'The keyword to get suitable subject codes',
        nullable: false,
    })
    options: ElectiveSubjectsArgs[];
}
