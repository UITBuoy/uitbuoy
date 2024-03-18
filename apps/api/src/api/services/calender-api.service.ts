import { Injectable } from '@nestjs/common';
import { Calender } from 'src/calender/entities/calender.entity';
import { CalenderNotFoundException } from 'src/calender/errors/not-found.error';
import WS_FUNCTION from 'src/common/constants/function-name';
import { ApiService } from '../api.service';
import { Event } from 'src/envent/entities/event.entity';

@Injectable()
export class CalenderApiService {
    constructor(private readonly apiService: ApiService) {}

    async getEventCalender({
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
            throw new CalenderNotFoundException();
        }

        return response.groupedbycourse;
    }
}
