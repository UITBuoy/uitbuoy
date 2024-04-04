import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../entities/course.entity';
import { CourseApiService } from '@/course/services/course-api.service';
import { CourseSectionEntity } from '../entities/course-section.entity';
import { CourseModuleEntity } from '../entities/course-module.entity';
import { User } from '@/user/entities/user.entity';
import { CourseContentEntity } from '../entities/course-content.entity';
import { QueryArgs } from '@/common/args/query.arg';

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course) private courseRepo: Repository<Course>,
        @InjectRepository(CourseSectionEntity)
        private sectionRepo: Repository<CourseSectionEntity>,
        private readonly courseApiService: CourseApiService,
    ) {}

    async findAllCoursesOfUser(
        user: User,
        queryArgs: QueryArgs,
    ): Promise<Course[]> {
        const keyword = queryArgs.keyword?.trim();

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
            .orWhere(
                queryArgs.isRecent
                    ? ``
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
                modules: [
                    ...section.modules.map((module) =>
                        module.modname === 'assign'
                            ? {
                                  ...module,
                                  assignOpenedDate: module.dates[0].timestamp,
                                  assignDueDate: module.dates[1].timestamp,
                              }
                            : module,
                    ),
                ],
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
