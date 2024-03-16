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

    async findAll(token: string) {
        const response = await this.courseApiService.getCourseListOfUser({ token });
        this.repo.save(response);
        return response;
    }
}
