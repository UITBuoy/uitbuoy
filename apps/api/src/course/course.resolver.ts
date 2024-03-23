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

@Resolver(() => Course)
export class CourseResolver {
    constructor(
        private readonly courseService: CourseService,
        private readonly courseApiService: CourseApiService,
    ) {}

    @Query(() => [Course])
    @UseGuards(JwtAuthGuard)
    async findAllCoursesOfUser(
        @CurrentUser() user: User,
        @Args() queryArgs: QueryArgs,
    ) {
        if (queryArgs.isNew) {
            const courses = (
                await this.courseApiService.findAllCoursesOfUser(user)
            ).map((course) => ({ ...course, users: [user] }));
            await this.courseService.save(courses);
            return courses;
        } else {
            return this.courseService.findAllCoursesOfUser(user);
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
