import { EventApiService } from '@/event/services/event-api.service';
import { LecturerService } from '@/lecturer/services/lecturer.service';
import { Resolver } from '@nestjs/graphql';
import { CourseSectionEntity } from '../entities/course-section.entity';
import { CourseApiService } from '../services/course-api.service';
import { CourseService } from '../services/course.service';

@Resolver(() => CourseSectionEntity)
export class SectionResolver {
    constructor(
        private readonly courseService: CourseService,
        private readonly courseApiService: CourseApiService,
        private readonly eventApiService: EventApiService,
        private readonly lecturerService: LecturerService,
    ) {}
}
