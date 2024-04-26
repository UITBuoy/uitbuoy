import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/user/entities/user.entity';
import { Subject } from './entities/subject.entity';
import { SubjectService } from './services/subject.service';
import { CourseResolver } from '@/course/resolvers/course.resolver';
import { SubjectConfiguration } from './configuration/subject.cofiguration';
import { EducationProgramConfiguration } from './configuration/educationProgram.configuration';
import { EducationProgram } from './entities/educationProgram.entity';

@Resolver(() => Subject)
export class SubjectResolver {
    constructor(
        private readonly subjecService: SubjectService,
        private readonly subjecConfig: SubjectConfiguration,
        private readonly educationProgramConfig: EducationProgramConfiguration,
    ) {}

    @Query(() => [EducationProgram], {
        description: 'Return all education programs of UIT students',
    })
    async crawlEducationProgram() {
        return this.educationProgramConfig.saveEducationProgramData();
    }

    @Query(() => Boolean, {
        description: 'Return all subjects of UIT students',
    })
    async crawlSubject() {
        return this.subjecConfig.cron();
    }

    @Query(() => [Subject])
    @UseGuards(JwtAuthGuard)
    findOne(@Args('code') code: string) {
        return this.subjecService.findSubjectDataByCode(code);
    }

    @Query(() => [Subject])
    @UseGuards(JwtAuthGuard)
    findAll(@CurrentUser() user: User, @Args('nameVN') nameVN: string) {
        return this.subjecService.findSubjectData(user.token, nameVN);
    }

    @Query(() => [Subject])
    @UseGuards(JwtAuthGuard)
    findAllEducationProgram(
        @CurrentUser() user: User,
        @Args('major') major: string,
    ) {
        return this.subjecService.findEducationProgram(user.token, major);
    }
}
