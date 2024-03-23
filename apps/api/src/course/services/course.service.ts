import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../entities/course.entity';
import { CourseApiService } from '@/course/services/course-api.service';
import { CourseContentEntity } from '../entities/course-content.entity';
import { CourseModuleEntity } from '../entities/course-module.entity';

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course) private courseRepo: Repository<Course>,
        @InjectRepository(CourseContentEntity)
        private contentRepo: Repository<CourseContentEntity>,
        @InjectRepository(CourseModuleEntity)
        private moduleRepo: Repository<CourseModuleEntity>,
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

        contents.forEach((content) => {
            this.moduleRepo.save(content.modules);
        });

        this.contentRepo.save(contents);
        return contents;
    }
}
