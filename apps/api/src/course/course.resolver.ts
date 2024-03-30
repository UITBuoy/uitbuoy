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
import { CourseService } from './services/course.service';
import { Course } from './entities/course.entity';
import { CourseContentEntity } from './entities/course-content.entity';
import { QueryArgs } from '@/common/args/query.arg';
import { CourseApiService } from './services/course-api.service';
import moment from 'moment';
import { EventEntity } from '@/event/entities/event.entity';
import { EventApiService } from '@/event/services/event-api.service';

@Resolver(() => Course)
export class CourseResolver {
    constructor(
        private readonly courseService: CourseService,
        private readonly courseApiService: CourseApiService,
        private readonly eventApiService: EventApiService,
    ) {}

    @Query(() => [Course])
    @UseGuards(JwtAuthGuard)
    async userCourses(@CurrentUser() user: User, @Args() queryArgs: QueryArgs) {
        if (queryArgs.isNew) {
            const apiCourses = (
                await this.courseApiService.findAllCoursesOfUser(user)
            ).map((course) => ({ ...course, users: [user] }));
            await this.courseService.save(apiCourses);
        }

        const courses = await this.courseService.findAllCoursesOfUser(
            user,
            queryArgs.keyword?.trim(),
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

    @Query(() => [CourseContentEntity])
    @UseGuards(JwtAuthGuard)
    findAllCourseContents(
        @CurrentUser() user: User,
        @Args('course_id') course_id: number,
    ) {
        return this.courseService.findCourseContents(user.token, course_id);
    }

    @ResolveField(() => [EventEntity])
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
            isComing
        });
    }
}
