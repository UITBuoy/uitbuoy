import { Injectable } from '@nestjs/common';
import WS_FUNCTION from 'src/common/constants/function-name';
import { CourseContentEntity } from 'src/course/entities/course-content.entity';
import { Course } from 'src/course/entities/course.entity';
import { CourseNotFoundException } from 'src/course/errors/not-found.error';
import { ApiService } from '../../api/api.service';

@Injectable()
export class CourseApiService {
    constructor(private readonly apiService: ApiService) {}

    /*The field to search can be left empty for all courses or:
                    id: course id
                    ids: comma separated course ids
                    shortname: course short name
                    idnumber: course id number
                    category: category id the course belongs to */
    // async getCourseListByField({
    //     token,
    //     username,
    // }: {
    //     token: string;
    //     username: string;
    // }) {
    //     const data = await this.apiService.fetchMoodleData<Course[]>({
    //         token,
    //         functionName: WS_FUNCTION.GET_COURSE_PROFILE,
    //         params: { field: 'username', 'values[0]': username },
    //     });
    //     if (data.length == 0) {
    //         throw new UserNotFoundException(username);
    //     }
    //     return { ...data[0], token };
    // }

    async findAllCoursesOfUser({
        token,
    }: {
        token: string;
    }): Promise<Course[]> {
        const classifications = ['past', 'inprogress', 'future'];

        const courses = [];

        await Promise.all(
            classifications.map(async (classification) => {
                const data = await this.apiService.fetchMoodleData<{
                    courses: Course[];
                }>({
                    token,
                    functionName: WS_FUNCTION.GET_COURSE_BY_TIMELINE,
                    params: { classification },
                });
                courses.push(...data.courses);
            }),
        );

        if (courses.length == 0) {
            throw new CourseNotFoundException();
        }

        return courses.map(
            (course: Course) =>
                ({
                    ...course,
                    display_name: course.fullname.split(' - ').at(0),
                }) as Course,
        );
    }

    async getCourseContent({
        token,
        course_id,
    }: {
        token: string;
        course_id: number;
    }): Promise<CourseContentEntity[]> {
        const contents = await this.apiService.fetchMoodleData<
            CourseContentEntity[]
        >({
            token,
            functionName: WS_FUNCTION.GET_COURSE_CONTENT_BY_ID,
            params: { courseid: course_id },
        });
        if (contents.length == 0) {
            throw new CourseNotFoundException();
        }

        return contents;
    }
}
