import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { CourseApiService } from 'src/api/services/course-api.service';

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course) private repo: Repository<Course>,
        private readonly courseApiService: CourseApiService,
    ) {}

    save(token: string) {
        return this.courseApiService.getCourseListOfUser({ token });
    }
}
