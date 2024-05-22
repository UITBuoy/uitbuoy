import { EventService } from '@/event/services/event.service';
import { User } from '@/user/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoteInput } from './dto/create-note.input';
import { UpdateNoteInput } from './dto/update-note.input';
import { NoteEntity } from './entities/note.entity';

@Injectable()
export class NoteService {
    constructor(
        @InjectRepository(NoteEntity)
        private readonly repo: Repository<NoteEntity>,
        private readonly eventService: EventService,
    ) {}

    async create(
        createNoteInput: CreateNoteInput,
        user: User,
    ): Promise<NoteEntity> {
        const event = await this.eventService.findById(
            createNoteInput.event_id,
        );
        return this.repo.save({ ...createNoteInput, user, event });
    }

    findAll(user_id: number, event_id?: number) {
        return this.repo.find({
            where: {
                user: { id: user_id },
                event: event_id ? { id: event_id } : undefined,
            },
            relations: { event: true, user: true },
        });
    }

    update(updateNoteInput: UpdateNoteInput) {
        return this.repo.update(updateNoteInput.id, updateNoteInput);
    }

    remove(id: string) {
        return this.repo.delete(id);
    }
}
