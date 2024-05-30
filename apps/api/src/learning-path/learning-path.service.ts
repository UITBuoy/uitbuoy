import { QueryArgs } from '@/common/args/query.arg';
import { CourseService } from '@/course/services/course.service';
import { MajorSubject } from '@/subject/entities/majorSubject.entity';
import { Subject } from '@/subject/entities/subject.entity';
import { SubjectService } from '@/subject/services/subject.service';
import { User } from '@/user/entities/user.entity';
import { UserService } from '@/user/services/user.service';
import { Injectable } from '@nestjs/common';
import { SemesterProgram } from './dto/semester-program.dto';

@Injectable()
export class LearningPathService {
    constructor(
        private readonly courseService: CourseService,
        private readonly userService: UserService,
        private readonly subjectService: SubjectService,
    ) {}

    async findMajorName(user: User): Promise<string> {
        const queryArgs: QueryArgs = {};
        queryArgs.keyword = 'CVHT';
        queryArgs.isRecent = false;
        queryArgs.isNew = false;

        const courses = await this.courseService.userCourses(user, queryArgs);
        return courses[0].coursecategory;
    }

    async findEducationProgram(user: User) {
        const majorName = await this.findMajorName(user);
        const year = await this.userService.findYear(user);
        return await this.subjectService.findSubjectEducationByYearAndMajorName(
            year,
            majorName,
        );
    }

    async findAllSubjects(user: User) {
        const educationProgram = await this.findEducationProgram(user);

        const subjects = [];
        educationProgram.sections.forEach((section) =>
            subjects.push(...section.subjects),
        );

        return subjects;
    }

    async recommendLearningPath(
        user: User,
        selectedSubjectCodes: string[],
        selectedSemesterNum?: number,
    ) {
        const educationProgram = await this.findEducationProgram(user);
        const { semesterNum: educationProgramSemesterNum, totalCredit } =
            educationProgram;

        const currentSemester = await this.userService.findSemester(user);
        const semesterNum =
            (selectedSemesterNum || educationProgramSemesterNum) -
            currentSemester;

        const learnedSubjectCodes =
            await this.courseService.findLearnedSubjects(user);

        const allSubjects: MajorSubject[] = [];
        educationProgram.sections.forEach((section) =>
            allSubjects.push(
                ...section.subjects.filter(
                    (s) => !learnedSubjectCodes.some((code) => code === s.code),
                ),
            ),
        );
        const requiredMajorSubjectCodes = allSubjects
            .filter((s) => s.isRequired)
            .map((s) => s.code);
        const electiveMajorSubjectCodes = allSubjects
            .filter((s) => !s.isRequired)
            .map((s) => s.code);

        const requiredSubjects =
            await this.subjectService.findSubjectsDataByCodes(
                requiredMajorSubjectCodes,
            );
        const electiveSubjects =
            await this.subjectService.findSubjectsDataByCodes(
                electiveMajorSubjectCodes,
            );

        const selectedSubjects =
            await this.subjectService.findSubjectsDataByCodes(
                selectedSubjectCodes,
            );

        const additionSubjectCodes = [];
        selectedSubjects.forEach((subject) => {
            const requiredSubjectCodes: string[] = JSON.parse(
                subject.requiredCode.replace('{', '[').replace('}', ']'),
            );
            const previousSubjectCodes: string[] = JSON.parse(
                subject.previousCode.replace('{', '[').replace('}', ']'),
            );
            additionSubjectCodes.push(
                ...requiredSubjectCodes,
                ...previousSubjectCodes,
            );
        });

        selectedSubjectCodes.push(
            ...additionSubjectCodes.filter(
                (code) => !selectedSubjectCodes.includes(code),
            ),
        );
        selectedSubjectCodes.push(
            ...requiredMajorSubjectCodes.filter(
                (code) => !selectedSubjectCodes.includes(code),
            ),
        );

        const allSelectedSubjects =
            await this.subjectService.findSubjectsDataByCodes(
                selectedSubjectCodes,
            );

        while (this.findTotalCredit(allSelectedSubjects) < totalCredit) {
            const randomIndex = Math.floor(
                Math.random() * electiveSubjects.length,
            );
            const subject = electiveSubjects.splice(randomIndex, 1)[0];
            allSelectedSubjects.push(subject);
        }

        const semesterPrograms: SemesterProgram[] = [];

        for (let i = 0; i < semesterNum; i++) {
            semesterPrograms.push({ index: i, subjects: [] });
            let currentCredit = 0;
            while (currentCredit < (totalCredit - 18) / (semesterNum - 1)) {
                if (allSelectedSubjects.length === 0) break;
                currentCredit +=
                    allSelectedSubjects[0].practicalCredit +
                    allSelectedSubjects[0].theoreticalCredit;
                semesterPrograms[i].subjects.push(allSelectedSubjects[0]);
                allSelectedSubjects.splice(0, 1);
            }
        }

        return semesterPrograms;
    }

    findTotalCredit(subjects: Subject[] | MajorSubject[]) {
        return subjects.reduce(
            (total, s) => total + s.practicalCredit + s.theoreticalCredit,
            0,
        );
    }
}
