import { CalendarNotFoundException } from '@/calendar/errors/not-found.error';
import { Injectable } from '@nestjs/common';
import WS_FUNCTION from 'src/common/constants/function-name';
import { Event } from 'src/event/entities/event.entity';
import { ApiService } from '../../api/api.service';

@Injectable()
export class CalendarApiService {
    constructor(private readonly apiService: ApiService) {}

    async getEventCalendar({
        token,
        courseids,
    }: {
        token: string;
        courseids: number[];
    }) {
        const courseObject = {};
        courseids.forEach((courseid, index) => {
            courseObject[`courseids[${index}]`] = courseid;
        });

        const response = await this.apiService.fetchMoodleData<{
            groupedbycourse: { events: Event[] }[];
        }>({
            token,
            functionName: WS_FUNCTION.GET_EVENT_BY_COURSE_IDS,
            params: { ...courseObject },
        });
        if (response.groupedbycourse.length == 0) {
            throw new CalendarNotFoundException();
        }

        return response.groupedbycourse;
    }
}
