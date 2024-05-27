import { CrawlArgs } from '@/common/args/crawl.arg';
import { UseGuards } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/user/entities/user.entity';
import { EducationProgramConfiguration } from './configuration/educationProgram.configuration';
import { SubjectConfiguration } from './configuration/subject.cofiguration';
import { EducationProgram } from './entities/educationProgram.entity';
import { Subject } from './entities/subject.entity';
import { SubjectService } from './services/subject.service';

@Resolver(() => Subject)
export class SubjectResolver {
    constructor(
        private readonly subjecService: SubjectService,
        private readonly subjecConfig: SubjectConfiguration,
        private readonly educationProgramConfig: EducationProgramConfiguration,
    ) {}

    // @Query(() => EducationProgram)
    // async test() {
    //     return this.subjecService.test();
    // }

    @Query(() => Subject)
    async subject(
        @Args('code', { type: () => String, nullable: false }) code: string,
    ) {
        return this.subjecService.findSubjectInfo(code);
    }

    @ResolveField(() => [Subject])
    async requiredSubjects(@Parent() subject: Subject): Promise<Subject[]> {
        const codes: string[] = JSON.parse(
            subject.requiredCode.replace('{', '[').replace('}', ']'),
        );
        const subjects =
            await this.subjecService.findSubjectsDataByCodes(codes);
        return subjects;
    }

    @ResolveField(() => [Subject])
    async previousSubjects(@Parent() subject: Subject): Promise<Subject[]> {
        const codes: string[] = JSON.parse(
            subject.previousCode.replace('{', '[').replace('}', ']'),
        );
        const subjects =
            await this.subjecService.findSubjectsDataByCodes(codes);
        return subjects;
    }

    @Query(() => [EducationProgram], {
        description: 'Return all education programs of UIT students',
    })
    async crawlEducationProgram(
        @Args() crawlArgs: CrawlArgs,
    ): Promise<EducationProgram[]> {
        return this.educationProgramConfig.saveEducationProgramData(crawlArgs);
    }

    @Query(() => [Subject], {
        description: 'Return all subjects of UIT students',
    })
    async crawlSubject() {
        return this.subjecConfig.saveSubject();
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
