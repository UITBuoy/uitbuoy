import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../entities/course.entity';
import { CourseApiService } from '@/course/services/course-api.service';
import { CourseSectionEntity } from '../entities/course-section.entity';
import { CourseModuleEntity } from '../entities/course-module.entity';
import { User } from '@/user/entities/user.entity';
import { CourseContentEntity } from '../entities/course-content.entity';

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course) private courseRepo: Repository<Course>,
        @InjectRepository(CourseSectionEntity)
        private sectionRepo: Repository<CourseSectionEntity>,
        @InjectRepository(CourseModuleEntity)
        private moduleRepo: Repository<CourseModuleEntity>,
        @InjectRepository(CourseContentEntity)
        private contentRepo: Repository<CourseContentEntity>,
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

    async save(courses: Course[]): Promise<void>;
    async save(courses: Course): Promise<void>;
    async save(courses: unknown): Promise<void> {
        this.courseRepo.save(courses);
    }

    async findAllSections(token: string, course_id: number) {
        const result = await this.sectionRepo.find({
            where: { course: { id: course_id } },
            order: {
                section: 'ASC',
                modules: { modname: 'DESC', contents: { id: 'ASC' } },
            },
            relations: { modules: { contents: true } },
        });
        if (!result.length) {
            let sections = await this.courseApiService.getCourseContent({
                token,
                course_id,
            });

            sections = sections.map((section) => ({
                ...section,
                course: { id: course_id },
            })) as any;

            await this.sectionRepo.save(sections);
            return sections;
        }
        return result;
    }

    async findCourseById(id: number) {
        return this.courseRepo.findOneBy({ id });
    }
}
