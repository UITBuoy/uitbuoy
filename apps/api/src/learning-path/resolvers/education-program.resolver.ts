import { EducationProgram } from '@/subject/entities/educationProgram.entity';
import { MajorSubject } from '@/subject/entities/majorSubject.entity';
import { Section } from '@/subject/entities/section.entity';
import { SubjectService } from '@/subject/services/subject.service';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { SectionSubject } from '../dto/section-subject.dto';
import { Subject } from '@/subject/entities/subject.entity';

@Resolver(() => EducationProgram)
export class EducationProgramResolver {
    constructor() {}

    @ResolveField(() => [Section])
    async sections(@Parent() educationProgram: EducationProgram) {
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
        return Array.from(sectionMap.values());
    }

    @ResolveField(() => [Section])
    async knowledgeBlocks(@Parent() educationProgram: EducationProgram) {
        return educationProgram.knowledgeBlocks;
    }
}

@Resolver(() => Section)
export class SectionResolver {
    constructor(private readonly subjectService: SubjectService) {}

    @ResolveField(() => [SectionSubject])
    async subjects(@Parent() section: Section): Promise<SectionSubject[]> {
        const subjects = await this.subjectService.findSubjectsDataByCodes(
            section.subjects.map((subject) => subject.code),
        );
        return section.subjects.map((subject) => ({
            ...subject,
            ...subjects.find((s) => (s.code = subject.code)),
        }));
    }
}

@Resolver(() => SectionSubject)
export class SectionSubjectResolver {
    constructor(private readonly subjectService: SubjectService) {}

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
