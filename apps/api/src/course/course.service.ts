import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { CourseApiService } from 'src/api/services/course-api.service';
import { CourseContentEntity } from './entities/course-content.entity';

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course) private courseRepo: Repository<Course>,
        @InjectRepository(CourseContentEntity)
        private contentRepo: Repository<CourseContentEntity>,
        private readonly courseApiService: CourseApiService,
    ) {}

    async findAll(token: string) {
        const response = await this.courseApiService.getCourseListOfUser({
            token,
        });
        this.courseRepo.save(response);
        return response;
    }

    async findCourseContents(token: string, course_id: number) {
        const contents = await this.courseApiService.getCourseContent({
            token,
            course_id,
        });
        this.contentRepo.save(contents);
        return contents;
    }
}
