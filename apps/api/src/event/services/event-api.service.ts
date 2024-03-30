import { CalendarNotFoundException } from '@/calendar/errors/not-found.error';
import { Injectable } from '@nestjs/common';
import WS_FUNCTION from 'src/common/constants/function-name';
import { EventEntity } from 'src/event/entities/event.entity';
import { ApiService } from '../../api/api.service';

@Injectable()
export class EventApiService {
    constructor(private readonly apiService: ApiService) {}

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
}
