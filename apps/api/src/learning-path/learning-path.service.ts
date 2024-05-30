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

        let selectedSubjects =
            await this.subjectService.findSubjectsDataByCodes(
                selectedSubjectCodes,
            );

        selectedSubjects.push(
            ...requiredSubjects.filter(
                (subject) =>
                    !selectedSubjects.map((s) => s.code).includes(subject.code),
            ),
        );

        let additionSubjectCodes = [];
        const semesterPrograms: SemesterProgram[] = [];

        selectedSubjects = selectedSubjects.map((s) => ({ ...s, priority: 0 }));

        // selectedSubjects = selectedSubjects.map((subject) => {
        //     const requiredSubjectCodes: string[] = JSON.parse(
        //         subject.requiredCode.replace('{', '[').replace('}', ']'),
        //     );
        //     const previousSubjectCodes: string[] = JSON.parse(
        //         subject.previousCode.replace('{', '[').replace('}', ']'),
        //     );
        //     additionSubjectCodes.push(
        //         ...requiredSubjectCodes,
        //         ...previousSubjectCodes,
        //     );

        //     additionSubjectCodes = additionSubjectCodes.filter(
        //         (code) => !learnedSubjectCodes.includes(code),
        //     );

        //     return {
        //         ...subject,
        //         priority: additionSubjectCodes.length !== 0 ? -1 : 0,
        //     };
        // });

        let priority = 0;

        do {
            selectedSubjects = selectedSubjects.map((subject) => {
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

                additionSubjectCodes = additionSubjectCodes.filter(
                    (code) => !learnedSubjectCodes.includes(code),
                );
                if (additionSubjectCodes.length !== 0) {
                    priority = subject.priority || 0;
                }

                return {
                    ...subject,
                    additionSubjects: [
                        ...requiredSubjectCodes,
                        ...previousSubjectCodes,
                    ],
                    priority:
                        additionSubjectCodes.length !== 0
                            ? subject.priority - 1
                            : subject.priority !== undefined
                              ? subject.priority
                              : priority,
                };
            });

            selectedSubjects = selectedSubjects.map((s) => ({
                ...s,
                priority: additionSubjectCodes.includes(s.code)
                    ? s.priority + 1
                    : s.priority,
            }));

            additionSubjectCodes = additionSubjectCodes?.filter(
                (code) => !selectedSubjects.map((s) => s.code).includes(code),
            );

            selectedSubjects.push(
                ...(
                    await this.subjectService.findSubjectsDataByCodes(
                        additionSubjectCodes,
                    )
                ).map((s) => ({ ...s, priority: priority + 1 })),
            );
        } while (additionSubjectCodes.length != 0);

        while (this.findTotalCredit(selectedSubjects) < totalCredit) {
            const randomIndex = Math.floor(
                Math.random() * electiveSubjects.length,
            );
            const subject = electiveSubjects.splice(randomIndex, 1)[0];

            selectedSubjects.push(subject);
        }
        selectedSubjects = selectedSubjects
            .map((s) => ({
                ...s,
                priority: s.priority || 0,
            }))
            .sort((a, b) => b.priority - a.priority);

        const maxPriority = Math.max(
            ...selectedSubjects.map((s) => s.priority),
        );

        for (let i = 0; i < semesterNum; i++) {
            semesterPrograms.push({ index: i, subjects: [] });
        }

        // selectedSubjects = selectedSubjects.filter((s) => {
        //     if (s.priority !== 0) {
        //         semesterPrograms[maxPriority - s.priority].subjects.push(s);
        //     }
        //     return s.priority === 0;
        // });

        console.log(selectedSubjects);
        for (let i = 0; i < semesterNum; i++) {
            let currentCredit = semesterPrograms[i].subjects.reduce(
                (total, s) => total + s.practicalCredit + s.theoreticalCredit,
                0,
            );
            while (currentCredit < (totalCredit - 18) / (semesterNum - 1)) {
                if (selectedSubjects.length === 0) break;
                const selectedSubject = selectedSubjects.splice(
                    selectedSubjects.findIndex(
                        (s) => s.additionSubjects?.length == 0,
                    ),
                    1,
                )[0];
                console.log({ selectedSubject });
                selectedSubjects = selectedSubjects.map((s) => {
                    return {
                        ...s,
                        additionSubjects: s.additionSubjects?.filter(
                            (code) => code != selectedSubject.code,
                        ),
                    };
                });
                currentCredit +=
                    selectedSubject.practicalCredit +
                    selectedSubject.theoreticalCredit;
                semesterPrograms[i].subjects.push(selectedSubject);
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
