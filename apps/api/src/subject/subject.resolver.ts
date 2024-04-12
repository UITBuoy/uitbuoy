import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/user/entities/user.entity';
import { Subject } from './entities/subject.entity';
import { SubjectService } from './subject.service';

@Resolver(() => Subject)
export class SubjectResolver {
    constructor(private readonly subjecService: SubjectService) {}

    @Query(() => [Subject])
    @UseGuards(JwtAuthGuard)
    findOne(@CurrentUser() user: User, @Args('code') code: string) {
        return this.subjecService.findSubjectDataByCode(user.token, code);
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
