import { EducationProgram } from '@/subject/entities/educationProgram.entity';
import { MajorSubject } from '@/subject/entities/majorSubject.entity';
import { Section } from '@/subject/entities/section.entity';
import { SubjectService } from '@/subject/services/subject.service';
import { Int, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { SectionSubject } from '../dto/section-subject.dto';
import { Subject } from '@/subject/entities/subject.entity';
import { CourseService } from '@/course/services/course.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { CurrentUser } from '@/auth/decorators/current-user.decorator';
import { User } from '@/user/entities/user.entity';

@Resolver(() => EducationProgram)
export class EducationProgramResolver {
    constructor() {}

    @ResolveField(() => [Section])
    async sections(
        @Parent() educationProgram: EducationProgram,
    ): Promise<Section[]> {
        const sectionMap = new Map<string, Section>();
        educationProgram.sections.forEach((section) => {
            const defaultSection = sectionMap.get(section.name);
            if (!defaultSection) {
                sectionMap.set(section.name, section);
            } else {
                sectionMap.set(section.name, {
                    ...defaultSection,
                    subjects: [...defaultSection.subjects, ...section.subjects],
                });
            }
        });
        return Array.from(sectionMap.values()).sort(
            (a, b) => (b.order || 0) - (a.order || 0),
        );
    }

    @ResolveField(() => [Section])
    async knowledgeBlocks(@Parent() educationProgram: EducationProgram) {
        return educationProgram.knowledgeBlocks;
    }
}

@Resolver(() => Section)
export class SectionResolver {
    constructor(
        private readonly subjectService: SubjectService,
        private readonly courseService: CourseService,
    ) {}

    @ResolveField(() => [SectionSubject])
    @UseGuards(JwtAuthGuard)
    async subjects(
        @Parent() section: Section,
        @CurrentUser() user: User,
    ): Promise<SectionSubject[]> {
        const learnedSubjectCodes =
            await this.courseService.findLearnedSubjects(user);
        const subjects = await this.subjectService.findSubjectsDataByCodes(
            section.subjects.map((subject) => subject.code),
        );
        return section.subjects.map((subject) => ({
            ...subject,
            ...subjects.find((s) => s.code == subject.code),
            isLearned: learnedSubjectCodes.includes(subject.code),
            type: subject.type,
        }));
    }

    @ResolveField(() => [SectionSubject])
    async totalCredit(@Parent() section: Section): Promise<number> {
        const subjects = await this.subjectService.findSubjectsDataByCodes(
            section.subjects.map((subject) => subject.code),
        );
        const totalCredit = subjects.reduce(
            (total, subject) =>
                total + subject.practicalCredit + subject.theoreticalCredit,
            0,
        );
        return totalCredit;
    }

    @ResolveField(() => Int)
    @UseGuards(JwtAuthGuard)
    async learnedCredit(
        @CurrentUser() user: User,
        @Parent() section: Section,
    ): Promise<number> {
        const learnedSubjectCodes =
            await this.courseService.findLearnedSubjects(user);

        const learnedSubjectCodesInSection = section.subjects.filter(
            (subject) => learnedSubjectCodes.includes(subject.code),
        );

        if (learnedSubjectCodesInSection.length === 0) return 0;

        const subjects = await this.subjectService.findSubjectsDataByCodes(
            learnedSubjectCodesInSection.map((subject) => subject.code),
        );
        const learnedCredit = subjects.reduce(
            (total, subject) =>
                total + subject.practicalCredit + subject.theoreticalCredit,
            0,
        );
        return learnedCredit;
    }
}

@Resolver(() => SectionSubject)
export class SectionSubjectResolver {
    constructor(
        private readonly subjectService: SubjectService,
        private readonly courseService: CourseService,
    ) {}

    // @ResolveField(() => Boolean)
    // @UseGuards(JwtAuthGuard)
    // async isLearned(
    //     @CurrentUser() user: User,
    //     @Parent() subject: SectionSubject,
    // ): Promise<boolean> {
    //     const learnedSubjectCodes =
    //         await this.courseService.findLearnedSubjects(user);

    //     return learnedSubjectCodes.includes(subject.code);
    // }

    @ResolveField(() => [Subject])
    async requiredSubjects(
        @Parent() subject: SectionSubject,
    ): Promise<Subject[]> {
        const codes: string[] = JSON.parse(
            subject.requiredCode.replace('{', '[').replace('}', ']'),
        );
        const subjects =
            await this.subjectService.findSubjectsDataByCodes(codes);
        return subjects;
    }

    @ResolveField(() => [Subject])
    async previousSubjects(
        @Parent() subject: SectionSubject,
    ): Promise<Subject[]> {
        const codes: string[] = JSON.parse(
            subject.previousCode.replace('{', '[').replace('}', ']'),
        );
        const subjects =
            await this.subjectService.findSubjectsDataByCodes(codes);
        return subjects;
    }

    @ResolveField(() => [Subject])
    async equivalentSubjects(
        @Parent() subject: SectionSubject,
    ): Promise<Subject[]> {
        const codes: string[] = JSON.parse(
            subject.equivalentCode.replace('{', '[').replace('}', ']'),
        );
        const subjects =
            await this.subjectService.findSubjectsDataByCodes(codes);
        return subjects;
    }
}
