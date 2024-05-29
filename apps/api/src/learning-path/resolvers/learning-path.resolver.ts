import { CurrentUser } from '@/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { EducationProgram } from '@/subject/entities/educationProgram.entity';
import { SubjectService } from '@/subject/services/subject.service';
import { User } from '@/user/entities/user.entity';
import { UserService } from '@/user/services/user.service';
import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { LearningPathService } from '../learning-path.service';

@Resolver()
export class LearningPathResolver {
    constructor(
        private readonly learningPathService: LearningPathService,
        private readonly userService: UserService,
        private readonly subjectService: SubjectService,
    ) {}

    @Query(() => EducationProgram, {
        description: "Current user's education program",
    })
    @UseGuards(JwtAuthGuard)
    async userEducationProgram(
        @CurrentUser() user: User,
    ): Promise<EducationProgram> {
        const majorName = await this.learningPathService.findMajorName(user);
        const year = await this.userService.findYear(user);
        const educationProgram =
            await this.subjectService.findSubjectEducationByYearAndMajorName(
                year,
                majorName,
            );
        return educationProgram;
    }
}
