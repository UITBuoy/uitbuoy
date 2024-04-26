import { ApiService } from '@/api/services/api.service';
import WS_FUNCTION from '@/common/constants/function-name';
import { Injectable } from '@nestjs/common';
import { Assignment } from '../entities/assignment.entity';

@Injectable()
export class AssignmentApiService {
    constructor(private readonly apiService: ApiService) {}

    async getUserAssigment({
        token,
        courseIds,
    }: {
        token: string;
        courseIds: number[];
    }) {
        const courseIdsObj = {};
        courseIds.forEach((id, i) => (courseIdsObj[`courseids[${i}]`] = id));

        const response = await this.apiService.fetchMoodleData<{
            courses: { assignments: Assignment[] }[];
        }>({
            token,
            functionName: WS_FUNCTION.GET_ASSIGNMENT,
            params: courseIdsObj,
        });

        const assignmentList: Assignment[] = [];
        response.courses.forEach(({ assignments }) =>
            assignmentList.push(...assignments),
        );

        return assignmentList
            .filter((v) => v.duedate * 1000 > new Date().getTime())
            .sort((a, b) => a.duedate - b.duedate);
    }

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
