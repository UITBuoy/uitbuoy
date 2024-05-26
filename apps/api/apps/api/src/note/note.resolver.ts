import { CurrentUser } from '@/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { EventEntity } from '@/event/entities/event.entity';
import { User } from '@/user/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import {
    Args,
    Int,
    Mutation,
    Parent,
    Query,
    ResolveField,
    Resolver,
} from '@nestjs/graphql';
import { CreateNoteInput } from './dto/create-note.input';
import { UpdateNoteInput } from './dto/update-note.input';
import { NoteEntity } from './entities/note.entity';
import { NoteNotFoundException } from './errors/NoteNotFoundException';
import { NoteService } from './note.service';

@Resolver(() => NoteEntity)
export class NoteResolver {
    constructor(private readonly noteService: NoteService) {}

    @Mutation(() => NoteEntity)
    @UseGuards(JwtAuthGuard)
    async createNote(
        @CurrentUser() user: User,
        @Args('createNoteInput') createNoteInput: CreateNoteInput,
    ) {
        return await this.noteService.create(createNoteInput, user);
    }

    @Query(() => [NoteEntity])
    @UseGuards(JwtAuthGuard)
    note(
        @CurrentUser() user: User,
        @Args('event_id', { nullable: true, type: () => Int })
        event_id?: number,
    ) {
        return this.noteService.findAll(user.id, event_id);
    }

    @Mutation(() => String)
    async updateNote(
        @Args('updateNoteInput') updateNoteInput: UpdateNoteInput,
    ) {
        const result = await this.noteService.update(updateNoteInput);
        if (result.affected === 0)
            throw new NoteNotFoundException(updateNoteInput.id);
        return true;
    }

    @Mutation(() => String)
    async removeNote(@Args('id') id: string) {
        const result = await this.noteService.remove(id);
        if (result.affected === 0) throw new NoteNotFoundException(id);
        return true;
    }

    @ResolveField(() => User)
    user(@Parent() note: NoteEntity) {
        return note.user;
    }

    @ResolveField(() => EventEntity)
    event(@Parent() note: NoteEntity) {
        return note.event;
    }
}
