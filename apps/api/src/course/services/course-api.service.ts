import { Injectable } from '@nestjs/common';
import WS_FUNCTION from 'src/common/constants/function-name';
import { CourseSectionEntity } from '@/course/entities/course-section.entity';
import { Course } from 'src/course/entities/course.entity';
import { CourseNotFoundException } from 'src/course/errors/not-found.error';
import { ApiService } from '../../api/api.service';

@Injectable()
export class CourseApiService {
    constructor(private readonly apiService: ApiService) {}

    async getCourseDetailInformation({
        token,
        id,
    }: {
        token: string;
        id: number;
    }): Promise<Course> {
        const data = await this.apiService.fetchMoodleData<{
            courses: Course[];
        }>({
            token,
            functionName: WS_FUNCTION.GET_COURSE_BY_FIELD,
            params: { field: 'id', value: id },
        });

        return data.courses[0];
    }

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

        return courses;
    }

    async getCourseContent({
        token,
        course_id,
    }: {
        token: string;
        course_id: number;
    }): Promise<CourseSectionEntity[]> {
        const contents = await this.apiService.fetchMoodleData<
            CourseSectionEntity[]
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
