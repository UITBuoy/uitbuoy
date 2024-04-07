import { CalendarNotFoundException } from '@/calendar/errors/not-found.error';
import { Injectable } from '@nestjs/common';
import WS_FUNCTION from 'src/common/constants/function-name';
import { EventEntity } from 'src/event/entities/event.entity';
import { ApiService } from '../../api/services/api.service';
import { CourseApiService } from '@/course/services/course-api.service';

@Injectable()
export class EventApiService {
    constructor(
        private readonly apiService: ApiService,
        private readonly courseApiService: CourseApiService,
    ) {}

    async getEventListOfCourse({
        token,
        courseid,
        isComing,
    }: {
        token: string;
        courseid: number;
        isComing: boolean;
    }) {
        const response = await this.apiService.fetchMoodleData<{
            groupedbycourse: { events: EventEntity[] }[];
        }>({
            token,
            functionName: WS_FUNCTION.GET_EVENT_BY_COURSE_IDS,
            params: {
                'courseids[0]': courseid,
                limitnum: 50,
                timesortfrom: 0,
            },
        });

        if (response.groupedbycourse.length == 0) {
            throw new CalendarNotFoundException();
        }

        if (isComing)
            return response.groupedbycourse[0].events.filter(
                (event) => event.timeusermidnight * 1000 > new Date().getTime(),
            );
        return response.groupedbycourse[0].events;
    }

    async getEventList({
        token,
        isComing = true,
    }: {
        token: string;
        isComing?: boolean;
    }): Promise<EventEntity[]> {
        const courses = await this.courseApiService.findAllCoursesOfUser({
            token,
        });

        const response = await this.apiService.fetchMoodleData<{
            groupedbycourse: { events: EventEntity[] }[];
        }>({
            token,
            functionName: WS_FUNCTION.GET_EVENT_BY_COURSE_IDS,
            params: {
                courseids: courses.map((course) => course.id),
                limitnum: 50,
                timesortfrom: 0,
            },
        });

        if (response.groupedbycourse.length == 0) {
            throw new CalendarNotFoundException();
        }

        const eventList: EventEntity[] = [];
        response.groupedbycourse.forEach(({ events }) =>
            eventList.push(...events),
        );

        if (isComing)
            return eventList.filter(
                (event) => event.timeusermidnight * 1000 > new Date().getTime(),
            );
        return eventList;
    }
}
