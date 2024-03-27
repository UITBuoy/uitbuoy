import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../entities/course.entity';
import { CourseApiService } from '@/course/services/course-api.service';
import { CourseContentEntity } from '../entities/course-content.entity';
import { CourseModuleEntity } from '../entities/course-module.entity';
import { User } from '@/user/entities/user.entity';

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

    async findAllCoursesOfUser(user: User, keyword: string): Promise<Course[]> {
        const response = await this.courseRepo
            .createQueryBuilder('course')
            .innerJoin(
                'course.users',
                'courseUser',
                'courseUser.id = :userId',
                { userId: user.id },
            )
            .where(
                keyword
                    ? `to_tsquery('${keyword.split(' ').join(' & ')}') @@ to_tsvector(unaccent(course.fullname))`
                    : 'true',
                { keyword },
            )
            .orWhere(
                keyword
                    ? `unaccent(course.fullname) ilike ('%' || unaccent(:keyword) || '%')`
                    : 'true',
                { keyword },
            )
            .orderBy('course.startdate', 'DESC')
            .getMany();
        return response;
    }

    async save(courses: Course[]) {
        this.courseRepo.save(courses);
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
