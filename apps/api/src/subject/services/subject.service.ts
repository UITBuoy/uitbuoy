import { User } from '@/user/entities/user.entity';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Like, Repository } from 'typeorm';
import { EducationProgram } from '../entities/educationProgram.entity';
import { MajorSubject } from '../entities/majorSubject.entity';
import { Section } from '../entities/section.entity';
import { Subject } from '../entities/subject.entity';
import { UserService } from '@/user/services/user.service';
import { CourseService } from '@/course/services/course.service';

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

    async findSubjectDataByCode(code: string) {
        return this.subjectRepo.findOneBy({ code });
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
    ) {
        console.log({ year, majorName });
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

    async findAllSubjectCodeByMajor(user: User, majorName: string) {
        const majorSubjectCodes: string[] = [];
        const requiredSubjectCodes: string[] = [];
        const electiveRequiredSubjectCodes: string[] = [];
        const electiveFreeSubjectCodes: string[] = [];

        const year = await this.userService.findYear(user);

        const years = await this.findSubjectEducationByYearAndMajorName(
            year,
            majorName,
        );
        if (years)
            for (let i = 0; i < years.sections.length; i++)
                for (let j = 0; j < years.sections[i].subjects.length; j++) {
                    majorSubjectCodes.push(years.sections[i].subjects[j].code);
                    if (years.sections[i].subjects[j].isRequired)
                        requiredSubjectCodes.push(
                            years.sections[i].subjects[j].code,
                        );
                    else
                        electiveFreeSubjectCodes.push(
                            years.sections[i].subjects[j].code,
                        );
                }

        console.log({ majorSubjectCodes });
        return [
            majorSubjectCodes,
            requiredSubjectCodes,
            electiveFreeSubjectCodes,
        ];
    }
}
