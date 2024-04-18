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

@Resolver(() => Course)
export class CourseResolver {
    constructor(
        private readonly courseService: CourseService,
        private readonly courseApiService: CourseApiService,
        private readonly eventApiService: EventApiService,
        private readonly lecturerService: LecturerService,
        private readonly assignmentApiService: AssignmentApiService,
    ) {}

    @Query(() => [Course], { description: 'Return all course of current user' })
    @UseGuards(JwtAuthGuard)
    async userCourses(@CurrentUser() user: User, @Args() queryArgs: QueryArgs) {
        if (queryArgs.isNew) {
            const apiCourses = (
                await this.courseApiService.findAllCoursesOfUser({
                    ...user,
                    ...queryArgs,
                })
            ).map((course) => ({ ...course, users: [user] }));
            await this.courseService.save(apiCourses);

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
        }

        const courses = await this.courseService.findAllCoursesOfUser(
            user,
            queryArgs,
        );

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
