import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MakeUpClass } from './entities/make-up-class.entity';
import { MakeUpClassService } from './services/make-up-class.service';
import { MakeUpClassApiService } from './services/make-up-class-api.service';
import { CurrentUser } from '@/auth/decorators/current-user.decorator';
import { User } from '@/user/entities/user.entity';
import { CourseService } from '@/course/services/course.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';

@Resolver(() => MakeUpClass)
export class MakeUpClassResolver {
    constructor(
        private readonly makeUpClassService: MakeUpClassService,
        private readonly courseService: CourseService,
        private readonly makeUpClassApiService: MakeUpClassApiService,
    ) {}

    @Query(() => [MakeUpClass], { name: 'makeUpClass' })
    @UseGuards(JwtAuthGuard)
    async findAll(
        @CurrentUser() user: User,
        @Args('courseCode', { nullable: true }) courseCode: string,
        @Args('year', { nullable: true }) year: number,
        @Args('month', { nullable: true }) month: number,
        @Args('day', { nullable: true }) day: number,
        @Args('inComing', {
            type: () => Boolean,
            nullable: true,
            defaultValue: true,
        })
        inComing: boolean,
    ) {
        const courses = await this.courseService.findAllCoursesOfUser(user);
        const codes = courses.map((course) => course.shortname);
        return this.makeUpClassService.findAll({
            year,
            month,
            day,
            courseCodes: courseCode ? [courseCode] : codes,
            inComing,
        });
    }

    @Mutation(() => Boolean)
    async updateMakeupClass(
        @Args('max_page', { type: () => Int, nullable: true, defaultValue: 50 })
        maxPage: number,
    ) {
        await this.makeUpClassApiService.fetchMakeupClass(maxPage);
        return true;
    }
}
