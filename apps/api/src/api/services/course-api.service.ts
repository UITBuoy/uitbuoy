import { Injectable } from '@nestjs/common';
import { ApiService } from '../api.service';
import WS_FUNCTION from 'src/common/constants/function-name';
import { UserNotFoundException } from 'src/user/errors/not-found.error';
import { Course } from 'src/course/entities/course.entity';

@Injectable()
export class CourseApiService {
    constructor(private readonly apiService: ApiService) {}

    async getCourseList({
        token,
        username,
    }: {
        token: string;
        username: string;
    }) {
        const data = await this.apiService.fetchMoodleData<Course[]>({
            token,
            functionName: WS_FUNCTION.GET_COURSE_PROFILE,
            params: { field: 'username', 'values[0]': username },
        });
        if (data.length == 0) {
            throw new UserNotFoundException(username);
        }
        return { ...data[0], token };
    }
}
