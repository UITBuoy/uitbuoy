import { Field, InputType, Int, OmitType } from '@nestjs/graphql';
import { NoteEntity } from '../entities/note.entity';

@InputType()
export class CreateNoteInput extends OmitType(
    NoteEntity,
    ['event', 'user', 'id'],
    InputType,
) {
    @Field(() => Int)
    event_id: number;
}
