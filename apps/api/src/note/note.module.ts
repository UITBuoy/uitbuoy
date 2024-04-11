import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteResolver } from './note.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteEntity } from './entities/note.entity';
import { EventModule } from '@/event/event.module';

@Module({
    imports: [TypeOrmModule.forFeature([NoteEntity]), EventModule],
    providers: [NoteResolver, NoteService],
    exports: [NoteService],
})
export class NoteModule {}
