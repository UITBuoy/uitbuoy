import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/user/entities/user.entity';
import { CourseService } from './course.service';
import { Course } from './entities/course.entity';

@Resolver(() => Course)
export class CourseResolver {
    constructor(private readonly courseService: CourseService) {}

    @Query(() => [Course])
    @UseGuards(JwtAuthGuard)
    findAllCourseListOfUser(@CurrentUser() user: User) {
        return this.courseService.findAll(user.token);
    }
}
