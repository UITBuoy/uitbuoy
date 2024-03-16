import { Injectable } from '@nestjs/common';
import { ApiService } from '../api.service';
import WS_FUNCTION from 'src/common/constants/function-name';
import { UserNotFoundException } from 'src/user/errors/not-found.error';
import { Course } from 'src/course/entities/course.entity';
import { CourseNotFoundException } from 'src/course/errors/not-found.error';

@Injectable()
export class CourseApiService {
    constructor(private readonly apiService: ApiService) {}

    /*The field to search can be left empty for all courses or:
                    id: course id
                    ids: comma separated course ids
                    shortname: course short name
                    idnumber: course id number
                    category: category id the course belongs to */
    async getCourseListByField({
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

    async getCourseListOfUser({ token }: { token: string }): Promise<Course[]> {
        const pastData = await this.apiService.fetchMoodleData<{
            courses: Course[];
        }>({
            token,
            functionName: WS_FUNCTION.GET_COURSE_BY_TIMELINE,
            params: { classification: 'past' },
        });
        const inprogressData = await this.apiService.fetchMoodleData<{
            courses: Course[];
        }>({
            token,
            functionName: WS_FUNCTION.GET_COURSE_BY_TIMELINE,
            params: { classification: 'inprogress' },
        });
        const futureData = await this.apiService.fetchMoodleData<{
            courses: Course[];
        }>({
            token,
            functionName: WS_FUNCTION.GET_COURSE_BY_TIMELINE,
            params: { classification: 'future' },
        });

        if (
            pastData.courses.length +
                inprogressData.courses.length +
                futureData.courses.length ==
            0
        ) {
            throw new CourseNotFoundException();
        }

        return [
            ...pastData.courses,
            ...inprogressData.courses,
            ...futureData.courses,
        ];
    }
}
