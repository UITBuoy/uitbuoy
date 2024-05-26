import { CurrentUser } from '@/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { CourseService } from '@/course/services/course.service';
import { User } from '@/user/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MakeUpClass } from './entities/make-up-class.entity';
import { MakeUpClassApiService } from './services/make-up-class-api.service';
import { MakeUpClassService } from './services/make-up-class.service';

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
        return this.makeUpClassService.findAll({
            year,
            month,
            day,
            userId: user.id,
            inComing,
        });
    }

    @Mutation(() => Boolean)
    async crawlMakeupClass(
        @Args('startPage', {
            nullable: true,
            defaultValue: 0,
            type: () => Int,
            description: 'Default page to crawl data',
        })
        startPage: number,
        @Args('pageNum', {
            nullable: true,
            defaultValue: 5,
            type: () => Int,
            description: 'Max page to crawl data, each page is 4 item',
        })
        pageNum: number,
    ) {
        await this.makeUpClassApiService.fetchMakeupClass(startPage, pageNum);
        return true;
    }
}
