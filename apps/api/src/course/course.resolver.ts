import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/user/entities/user.entity';
import { CourseService } from './services/course.service';
import { Course } from './entities/course.entity';
import { CourseContentEntity } from './entities/course-content.entity';
import { QueryArgs } from '@/common/args/query.arg';
import { CourseApiService } from './services/course-api.service';
import moment from 'moment';

@Resolver(() => Course)
export class CourseResolver {
    constructor(
        private readonly courseService: CourseService,
        private readonly courseApiService: CourseApiService,
    ) {}

    @Query(() => [Course])
    @UseGuards(JwtAuthGuard)
    async userCourses(
        @CurrentUser() user: User,
        @Args() queryArgs: QueryArgs,
        @Args('isRecent', {
            type: () => Boolean,
            nullable: true,
            defaultValue: false,
        })
        isRecent: boolean,
    ) {
        let result = [];

        if (queryArgs.isNew) {
            const courses = (
                await this.courseApiService.findAllCoursesOfUser(user)
            ).map((course) => ({ ...course, users: [user] }));
            await this.courseService.save(courses);
            result = courses;
        } else {
            const courses = await this.courseService.findAllCoursesOfUser(user);
            if (courses.length == 0) {
                result = await this.courseApiService.findAllCoursesOfUser(user);
            }
        }

        if (isRecent) {
            return result.filter(
                ({ startdate }) =>
                    moment().diff(
                        moment(new Date(startdate * 1000)),
                        'months',
                        true,
                    ) < 5,
            );
        }
    }

    @Query(() => [CourseContentEntity])
    @UseGuards(JwtAuthGuard)
    findAllCourseContents(
        @CurrentUser() user: User,
        @Args('course_id') course_id: number,
    ) {
        return this.courseService.findCourseContents(user.token, course_id);
    }
}
