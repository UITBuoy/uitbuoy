import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGoogleCalendarInput {
    @Field(() => Int)
    id: number;
}
