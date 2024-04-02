import { ApiService } from '@/api/api.service';
import { Injectable } from '@nestjs/common';
import { Assignment } from '../entities/assignment.entity';
import WS_FUNCTION from '@/common/constants/function-name';

@Injectable()
export class AssignmentApiService {
    constructor(private readonly apiService: ApiService) {}

    async getAssigmentList({
        token,
        courseid,
    }: {
        token: string;
        courseid: number;
    }) {
        const response = await this.apiService.fetchMoodleData<{
            courses: { assignments: Assignment[] }[];
        }>({
            token,
            functionName: WS_FUNCTION.GET_ASSIGNMENT,
            params: { 'courseids[0]': courseid },
        });

        return response.courses[0].assignments;
    }
}
