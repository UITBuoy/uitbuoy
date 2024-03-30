import { forwardRef, Module } from '@nestjs/common';
import { Action } from './entities/action.entity';
import { ApiModule } from 'src/api/api.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventService } from './services/event.service';
import { EventResolver } from './event.resolver';
import { EventApiService } from './services/event-api.service';
import { CourseModule } from '@/course/course.module';

@Module({
    imports: [
        ApiModule,
        forwardRef(() => CourseModule),
        TypeOrmModule.forFeature([Event]),
        TypeOrmModule.forFeature([Action]),
    ],
    providers: [EventService, EventApiService, EventResolver],
    exports: [EventService, EventApiService],
})
export class EventModule {}
