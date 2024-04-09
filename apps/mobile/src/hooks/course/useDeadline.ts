import moment from 'moment';
import { useMemo } from 'react';
import {
    CourseModuleEntity,
    useGeneralDetailCourseQuery,
} from '../../gql/graphql';

export function useDeadline(id: number) {
    const { data, loading, error } = useGeneralDetailCourseQuery({
        variables: { id },
    });
    console.log({ data });

    const hasDeadline = data?.course.assignments.some(
        (assignment) =>
            moment(new Date(assignment.duedate * 1000)).diff(moment(), 'days') >
            0,
    );

    const mostRecentActivity = useMemo<
        Partial<CourseModuleEntity> | undefined
    >(() => {
        let value: Partial<CourseModuleEntity>;
        data?.course.contentSections.forEach((section) => {
            section.courseModules.forEach((module) => {
                if (!data) return;
                if (module.modname != 'assign') return;
                if (module.assignDueDate * 1000 < new Date().getTime()) return;
                if (!value) {
                    value = module;
                    return;
                }
                if (value.assignDueDate > module.assignDueDate) {
                    value = module;
                }
            });
        });
        return value;
    }, [data]);

    return { hasDeadline, mostRecentActivity, loading, error };
}
