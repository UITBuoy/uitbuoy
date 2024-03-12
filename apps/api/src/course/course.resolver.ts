import { Resolver } from '@nestjs/graphql';
import { CourseService } from './course.service';
import { Course } from './entities/course.entity';

@Resolver(() => Course)
export class CourseResolver {
    constructor(private readonly courseService: CourseService) {}
}
