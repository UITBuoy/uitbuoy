import { QueryArgs } from '@/common/args/query.arg';
import { CourseApiService } from '@/course/services/course-api.service';
import { SubjectService } from '@/subject/services/subject.service';
import { User } from '@/user/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseSectionEntity } from '../entities/course-section.entity';
import { Course } from '../entities/course.entity';
import moment from 'moment';
import { GiveLearningPathSubjectCodesResult } from '../dto/give-learning-path-subject-codes-result.dto';
import { ElectiveObjectArgs } from '@/common/args/electiveSubjects.arg';
import { MajorSubject } from '@/subject/entities/majorSubject.entity';
import { UserService } from '@/user/services/user.service';
import { extraIncludes } from '@/common/utils/extraIncludes';
import { ElectiveSubjectsResult } from '../dto/elective-subject-result.dto copy';

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course) private courseRepo: Repository<Course>,
        @InjectRepository(CourseSectionEntity)
        private sectionRepo: Repository<CourseSectionEntity>,
        private readonly courseApiService: CourseApiService,
        private readonly subjectService: SubjectService,
        private readonly userService: UserService,
    ) {}

    async userCourses(user: User, queryArgs: QueryArgs) {
        if (queryArgs.isNew) {
            const apiCourses = (
                await this.courseApiService.findAllCoursesOfUser({
                    ...user,
                    ...queryArgs,
                })
            ).map((course) => ({ ...course, users: [user] }));
            await this.save(apiCourses);

            if (queryArgs.isRecent) {
                return apiCourses.filter(
                    ({ startdate }) =>
                        moment().diff(
                            moment(new Date(startdate * 1000)),
                            'months',
                            true,
                        ) < 5,
                );
            }
            return apiCourses;
        }

        const courses = await this.findAllCoursesOfUser(user, queryArgs);

        if (queryArgs.isRecent) {
            return courses.filter(
                ({ startdate }) =>
                    moment().diff(
                        moment(new Date(startdate * 1000)),
                        'months',
                        true,
                    ) < 5,
            );
        }
        return courses;
    }

    async findAllCoursesOfUser(
        user: User,
        queryArgs: QueryArgs = {},
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
        try {
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
        } catch (error) {
            const result = await this.sectionRepo.find({
                where: { course: { id: course_id } },
                order: {
                    section: 'ASC',
                    modules: { modname: 'DESC', contents: { id: 'ASC' } },
                },
                relations: { modules: { contents: true } },
            });
            return result;
        }
    }

    async findCourseById(id: number | undefined) {
        return this.courseRepo.findOneBy({ id });
    }

    async findUserMajorByCourse(
        user: User,
        queryArgs: QueryArgs,
    ): Promise<string[]> {
        queryArgs.keyword = 'CVHT';
        queryArgs.isRecent = false;
        queryArgs.isNew = false;

        const courses = await this.userCourses(user, queryArgs);
        const responseCourse = await this.findCourseById(courses?.[0]?.id);
        return [responseCourse?.shortname, responseCourse?.coursecategory];
    }

    async findAllSubjectCodeByLearntCourse(
        resolverCourses: Course[],
    ): Promise<string[]> {
        const learntSubjectCodes: string[] = [];
        for (let i = 0; i < resolverCourses.length; i++) {
            const responseCourse = await this.findCourseById(
                resolverCourses[i].id,
            );
            learntSubjectCodes.push(responseCourse.shortname);
        }
        console.log({ learntSubjectCodes });
        return learntSubjectCodes;
    }

    async spliceSubjectCodeArray(
        subjectCodeArray: string[],
        compareSubjectCodeArray: string[],
    ): Promise<string[]> {
        console.log({ subjectCodeArray, compareSubjectCodeArray });
        const newSubjectCodeArray = [...subjectCodeArray];
        for (let i = 0; i < newSubjectCodeArray.length; i++) {
            for (let j = 0; j < compareSubjectCodeArray.length; j++) {
                if (
                    extraIncludes(newSubjectCodeArray[i], 'ME001') ||
                    extraIncludes(
                        compareSubjectCodeArray[j],
                        newSubjectCodeArray[i],
                    )
                ) {
                    newSubjectCodeArray.splice(i, 1);
                    i--;
                    break;
                }
            }
        }

        console.log({ newSubjectCodeArray });
        return newSubjectCodeArray;
    }

    async recommendElectiveSubject(
        user: User,
        queryArgs: QueryArgs,
        electiveObjectArgs: ElectiveObjectArgs,
    ): Promise<ElectiveSubjectsResult[]> {
        const majorName = (
            await this.findUserMajorByCourse(user, queryArgs)
        )[1];

        const year = await this.userService.findYear(user);

        const electiveMajorSubjects =
            await this.subjectService.findMajorSubjectByCodeList(
                (await this.giveLearningPathSubjectCodes(user, queryArgs))
                    .electiveSubjects,
                majorName,
                year,
            );

        const electiveSubjects: {
            name: string;
            credits: string;
            codes: string[];
        }[] = electiveObjectArgs.options.map((value) => ({
            ...value,
            codes: [],
        }));

        for (let i = 0; i < electiveObjectArgs.options.length; i++) {
            for (let j = 0; j < electiveMajorSubjects.length; j++) {
                if (
                    extraIncludes(
                        electiveMajorSubjects[j].sections[0].name,
                        electiveObjectArgs.options[i].name,
                    )
                ) {
                    electiveSubjects[i].codes.push(
                        electiveMajorSubjects[j].code,
                    );
                }
            }
        }
        console.log({ electiveSubjects });

        return electiveSubjects;
    }

    async giveLearningPathSubjectCodes(
        user: User,
        queryArgs: QueryArgs,
    ): Promise<GiveLearningPathSubjectCodesResult> {
        queryArgs.isRecent = false;
        queryArgs.isNew = false;

        const courses = await this.userCourses(user, queryArgs);

        const learntCourse =
            await this.findAllSubjectCodeByLearntCourse(courses);

        const majorName = (
            await this.findUserMajorByCourse(user, queryArgs)
        )[1];

        const allSubjectCodesByMajor =
            await this.subjectService.findAllSubjectCodeByMajor(
                user,
                majorName,
            );

        console.log({ allSubjectCodesByMajor });
        const electiveSubjects = [
            ...(await this.spliceSubjectCodeArray(
                allSubjectCodesByMajor.electiveSubjectCodes,
                learntCourse,
            )),
        ];

        const requiredSubjects = [
            ...(await this.spliceSubjectCodeArray(
                allSubjectCodesByMajor.requiredSubjectCodes,
                learntCourse,
            )),
        ];
        return { electiveSubjects, requiredSubjects };
    }
}
