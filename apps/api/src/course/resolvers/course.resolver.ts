import { UseGuards } from '@nestjs/common';
import {
    Args,
    Int,
    Parent,
    Query,
    ResolveField,
    Resolver,
} from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/user/entities/user.entity';
import { CourseService } from '../services/course.service';
import { Course } from '../entities/course.entity';
import { CourseSectionEntity } from '../entities/course-section.entity';
import { QueryArgs } from '@/common/args/query.arg';
import { CourseApiService } from '../services/course-api.service';
import moment from 'moment';
import { EventEntity } from '@/event/entities/event.entity';
import { EventApiService } from '@/event/services/event-api.service';
import { LecturerService } from '@/lecturer/services/lecturer.service';
import { Lecturer } from '@/lecturer/lecturer.entity';
import { AssignmentApiService } from '@/event/services/assignment-api.service';
import { Assignment } from '@/event/entities/assignment.entity';
import { LearningPathArgs } from '@/common/args/learningPath.arg';
import { SubjectService } from '@/subject/services/subject.service';
import { Subject } from '@/subject/entities/subject.entity';
import { GiveLearningPathSubjectCodesResult } from '../dto/give-learning-path-subject-codes-result.dto';
import {
    ElectiveObjectArgs,
    ElectiveSubjectsArgs,
} from '@/common/args/electiveSubjects.arg';
import { ElectiveSubjectsResult } from '../dto/elective-subject-result.dto copy';

@Resolver(() => Course)
export class CourseResolver {
    constructor(
        private readonly courseService: CourseService,
        private readonly courseApiService: CourseApiService,
        private readonly eventApiService: EventApiService,
        private readonly lecturerService: LecturerService,
        private readonly assignmentApiService: AssignmentApiService,
        private readonly subjectService: SubjectService,
    ) {}

    @Query(() => [ElectiveSubjectsResult], {
        description: 'Return all elective subjects recommend for user',
    })
    @UseGuards(JwtAuthGuard)
    async recommendElectiveSubject(
        @CurrentUser() user: User,
        @Args() queryArgs: QueryArgs,
        @Args() electiveObjectArgs: ElectiveObjectArgs,
    ): Promise<ElectiveSubjectsResult[]> {
        return this.courseService.recommendElectiveSubject(
            user,
            queryArgs,
            electiveObjectArgs,
        );
    }

    @Query(() => [Subject], {
        description: 'Return all subjects recommend for user',
    })
    @UseGuards(JwtAuthGuard)
    async recommendSubject(
        @CurrentUser() user: User,
        @Args() learningPathArgs: LearningPathArgs,
        @Args() queryArgs: QueryArgs,
    ) {
        queryArgs.isRecent = false;

        const giveLearningPathSubjectCodesResult =
            await this.courseService.giveLearningPathSubjectCodes(
                user,
                queryArgs,
            );
        // const result: Subject[] = [];
        const result: Subject[] =
            await this.subjectService.findSubjectsDataByCodes(
                giveLearningPathSubjectCodesResult[learningPathArgs.option],
            );
        // for (
        //     let i = 0;
        //     i <
        //     giveLearningPathSubjectCodesResult[learningPathArgs.option].length;
        //     i++
        // ) {
        //     result.push(
        //         await this.subjectService.findSubjectDataByCode(
        //             giveLearningPathSubjectCodesResult[learningPathArgs.option][
        //                 i
        //             ],
        //         ),
        //     );
        // }
        return result;
    }

    @Query(() => GiveLearningPathSubjectCodesResult, {
        description: 'Return learning code of elective subjects',
    })
    @UseGuards(JwtAuthGuard)
    async giveLearningPathSubjectCodes(
        @CurrentUser() user: User,
        @Args() queryArgs: QueryArgs,
    ): Promise<GiveLearningPathSubjectCodesResult> {
        return this.courseService.giveLearningPathSubjectCodes(user, queryArgs);
    }

    @Query(() => [String], {
        description: 'Return string array is [class,major] of user',
    })
    @UseGuards(JwtAuthGuard)
    async findUserMajorByCourse(
        @CurrentUser() user: User,
        @Args() queryArgs: QueryArgs,
    ): Promise<string[]> {
        return this.courseService.findUserMajorByCourse(user, queryArgs);
    }

    @Query(() => [Course], { description: 'Return all course of current user' })
    @UseGuards(JwtAuthGuard)
    async userCourses(@CurrentUser() user: User, @Args() queryArgs: QueryArgs) {
        return this.courseService.userCourses(user, queryArgs);
    }

    @Query(() => Course, {
        description: 'Get detail information about a specific course',
    })
    @UseGuards(JwtAuthGuard)
    async course(
        @CurrentUser() user: User,
        @Args('course_id', { type: () => Int }) course_id: number,
        @Args() queryArgs: QueryArgs,
    ): Promise<Course> {
        if (queryArgs.isNew) {
            const apiCourse =
                await this.courseApiService.getCourseDetailInformation({
                    ...user,
                    id: course_id,
                });
            apiCourse.users = [user];
            apiCourse.contacts = await this.lecturerService.save(
                user.token,
                apiCourse.contacts.map((contact) => contact.id),
            );
            await this.courseService.save(apiCourse);
            return apiCourse;
        }

        const course = await this.courseService.findCourseById(course_id);
        return course;
    }

    @ResolveField(() => [CourseSectionEntity], {
        description:
            'Get all content section (i.e. "Giới thiệu chung", "Chương 1")',
    })
    async contentSections(@CurrentUser() user: User, @Parent() course: Course) {
        return this.courseService.findAllSections(user.token, course.id);
    }

    @ResolveField(() => [Lecturer], {
        description: 'Information of the lecturer',
    })
    async contacts(@CurrentUser() user: User, @Parent() course: Course) {
        return this.lecturerService.findByCourseId(course.id);
    }

    @ResolveField(() => Assignment, {
        description:
            'Find detail information of a specific assignment of the course',
    })
    async assignment(
        @CurrentUser() user: User,
        @Parent() course: Course,
        @Args('cmid', { type: () => Int }) cmid: number,
    ) {
        const assignments = await this.assignmentApiService.getAssigmentList({
            ...user,
            courseid: course.id,
        });
        return assignments.find((assignment) => assignment.cmid === cmid);
    }

    @ResolveField(() => [Assignment], {
        description: 'All assignments of the current course',
    })
    async assignments(@CurrentUser() user: User, @Parent() course: Course) {
        return this.assignmentApiService.getAssigmentList({
            ...user,
            courseid: course.id,
        });
    }

    @ResolveField(() => [EventEntity], {
        description: 'All events of the current course',
    })
    async events(
        @CurrentUser() user: User,
        @Parent() course: Course,
        @Args('isComing', {
            type: () => Boolean,
            nullable: true,
            defaultValue: true,
        })
        isComing: boolean,
    ) {
        return this.eventApiService.getEventListOfCourse({
            ...user,
            courseid: course.id,
            isComing,
        });
    }
}
