import { QueryArgs } from '@/common/args/query.arg';
import { CourseService } from '@/course/services/course.service';
import { User } from '@/user/entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LearningPathService {
    constructor(private readonly courseService: CourseService) {}

    async findMajorName(user: User): Promise<string> {
        const queryArgs: QueryArgs = {};
        queryArgs.keyword = 'CVHT';
        queryArgs.isRecent = false;
        queryArgs.isNew = false;

        const courses = await this.courseService.userCourses(user, queryArgs);
        return courses[0].coursecategory;
    }
}
