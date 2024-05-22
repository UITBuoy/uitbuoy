import { CurrentUser } from '@/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { Course } from '@/course/entities/course.entity';
import { User } from '@/user/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import {
    Args,
    Int,
    Mutation,
    Parent,
    PartialType,
    Query,
    ResolveField,
    Resolver,
} from '@nestjs/graphql';
import { EventReminder } from '../entities/event-reminder.entity';
import { EventEntity } from '../entities/event.entity';
import { EventApiService } from '../services/event-api.service';
import { EventReminderService } from '../services/event-reminder.service';
import { EventService } from '../services/event.service';
import { EventReminderInput } from '../dto/event-reminder.dto';
import { QueryArgs } from '@/common/args/query.arg';
import { Assignment } from '../entities/assignment.entity';
import { CourseService } from '@/course/services/course.service';
import { AssignmentApiService } from '../services/assignment-api.service';

@Resolver(() => Assignment)
export class AssignmentResolver {
    constructor(
        private readonly courseService: CourseService,
        private readonly assignmentApiService: AssignmentApiService,
    ) {}

    @Query(() => [Assignment], {
        description: 'All assignments of current user',
    })
    @UseGuards(JwtAuthGuard)
    async assignments(@CurrentUser() user: User) {
        const courses = await this.courseService.findAllCoursesOfUser(user);
        const courseIds = courses.map((course) => course.id);
        return this.assignmentApiService.getUserAssigment({
            token: user.token,
            courseIds,
        });
    }
}
