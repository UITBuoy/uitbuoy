import { CourseService } from '@/course/services/course.service';
import { User } from '@/user/entities/user.entity';
import { UserService } from '@/user/services/user.service';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';
import { EducationProgram } from '../entities/educationProgram.entity';
import { MajorSubject } from '../entities/majorSubject.entity';
import { Section } from '../entities/section.entity';
import { Subject } from '../entities/subject.entity';
import { AllSubjectCodeByMajorResult } from '../dto/allSubjectCodes';

@Injectable()
export class SubjectService {
    constructor(
        @InjectRepository(Subject) private subjectRepo: Repository<Subject>,
        @InjectRepository(EducationProgram)
        private educationProgramRepo: Repository<EducationProgram>,
        @InjectRepository(MajorSubject)
        private majorSubjectRepo: Repository<MajorSubject>,
        @InjectRepository(Section)
        private sectionRepo: Repository<Section>,
        private readonly userService: UserService,
        @Inject(forwardRef(() => CourseService))
        private readonly courseService: CourseService,
    ) {}

    async findAllSections() {
        const result = await this.educationProgramRepo.findOne({
            where: {
                year: 'CTĐT Khoá 2021',
                majorName:
                    'Cử nhân ngành Kỹ thuật Phần mềm (Áp dụng từ khóa 15 - 2020)',
            },
            relations: {
                sections: {
                    subjects: true,
                },
            },
        });
        result.sections.forEach((section) => console.log(section));
        return result;
    }

    async findSubjectInfo(code: string) {
        const subject = await this.subjectRepo.findOne({ where: { code } });
        console.log({ subject });
        return subject;
    }

    async findSubjectDataByCode(code: string) {
        return this.subjectRepo.findOneBy({ code });
    }

    async findSubjectsDataByCodes(codes: string[]): Promise<Subject[]> {
        return this.subjectRepo.findBy({ code: In(codes) });
    }

    async findSubjectCodeBySectionName(sectionName: string) {
        return this.majorSubjectRepo.findBy({
            sections: {
                name: sectionName,
            },
        });
    }

    async findSubjectCodesByMajorSubjects(majorSubjects: MajorSubject[]) {
        const subjectCodes: String[] = [];
        for (let i = 0; i < majorSubjects.length; i++) {
            subjectCodes.push(majorSubjects[i].code);
        }
        return subjectCodes;
    }

    async findMajorSubjectByCodeList(
        codes: string[],
        majorName: string,
        year: string,
    ) {
        console.log({ codes, majorName, year });
        return this.majorSubjectRepo.find({
            where: {
                code: In(codes),
                sections: {
                    educationProgram: {
                        majorName: ILike(`%${majorName}%`),
                        year: ILike(`%${year}%`),
                    },
                },
            },
            relations: {
                sections: {
                    educationProgram: true,
                },
            },
        });
    }

    async findSectionByName(name: string) {
        return this.sectionRepo.findBy({ name });
    }

    async findSectionNameByMajorSubjectCode(code: string) {
        return this.sectionRepo.findBy({ subjects: { code: code } });
    }

    async findSectionNameByMajorSubjectId(code: string) {
        return this.sectionRepo.findBy(
            await this.majorSubjectRepo.findBy({ code }),
        );
    }

    async findSubjectData(token: String, nameEN: string) {
        return this.subjectRepo.findBy({ nameEN });
    }

    async findAllSubject() {
        return this.subjectRepo.find();
    }

    async findEducationProgram(token: String, majorName: string) {
        return this.educationProgramRepo.findBy({ majorName });
    }

    async findAllEducationProgram() {
        return this.educationProgramRepo.find();
    }

    async findSubjectEducationByYearAndMajorName(
        year: string,
        majorName: string,
    ): Promise<EducationProgram> {
        return this.educationProgramRepo.findOne({
            where: {
                year: ILike(`%20${year}%`),
                majorName: ILike(`%${majorName}%`),
            },
            relations: {
                sections: {
                    subjects: true,
                },
            },
        });
    }

    async findAllSubjectCodeByMajor(
        user: User,
        majorName: string,
    ): Promise<AllSubjectCodeByMajorResult> {
        const majorSubjectCodes: string[] = [];
        const requiredSubjectCodes: string[] = [];
        const electiveSubjectCodes: string[] = [];

        const allSubjectCodes: AllSubjectCodeByMajorResult = {
            majorSubjectCodes,
            requiredSubjectCodes,
            electiveSubjectCodes,
        };

        const year = await this.userService.findYear(user);

        const years = await this.findSubjectEducationByYearAndMajorName(
            year,
            majorName,
        );
        if (years)
            for (let i = 0; i < years.sections.length; i++)
                for (let j = 0; j < years.sections[i].subjects.length; j++) {
                    allSubjectCodes.majorSubjectCodes.push(
                        years.sections[i].subjects[j].code,
                    );
                    if (years.sections[i].subjects[j].isRequired)
                        allSubjectCodes.requiredSubjectCodes.push(
                            years.sections[i].subjects[j].code,
                        );
                    else
                        allSubjectCodes.electiveSubjectCodes.push(
                            years.sections[i].subjects[j].code,
                        );
                }

        console.log({ majorSubjectCodes });
        return allSubjectCodes;
    }
}
