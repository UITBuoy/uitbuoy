import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CalenderApiService } from 'src/api/services/calender-api.service';
import { Repository } from 'typeorm';

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(Event) private eventRepo: Repository<Event>,
        private readonly calenderApiService: CalenderApiService,
    ) {}



    // async findCourseContents(token: string, course_id: number) {
    //     const contents = await this.courseApiService.getCourseContent({
    //         token,
    //         course_id,
    //     });

    //     contents.forEach((content) => {
    //         this.moduleRepo.save(content.modules);
    //     });

    //     this.contentRepo.save(contents);
    //     return contents;
    // }
}
