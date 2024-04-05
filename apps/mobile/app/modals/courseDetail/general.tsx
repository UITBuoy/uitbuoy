import { Spinner } from '@gluestack-ui/themed';
import moment from 'moment';
import { useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import CourseContentAccordion from '../../../src/components/Accordion/CourseContentAccordion';
import CourseAlert from '../../../src/components/CourseAlert/CourseAlert';
import NativeButton from '../../../src/components/NativeButton/NativeButton';
import {
    CourseModuleEntity,
    EventEntity,
    useGeneralDetailCourseQuery,
} from '../../../src/gql/graphql';

type Props = {
    id: number;
};

export default function GeneralPage({ id }: Props) {
    const { data, loading, error } = useGeneralDetailCourseQuery({
        variables: { id },
    });

    const hasDeadline = data?.course.events.some(
        (event) =>
            moment(new Date(event.timestart * 1000)).diff(moment(), 'days') > 0,
    );

    const mostRecentActivity = useMemo(() => {
        let value: Partial<CourseModuleEntity>;
        data?.course.contentSections.forEach((section) => {
            section.courseModules.forEach((module) => {
                if (!data) return;
                if (module.modname != 'assign') return;
                if (!value) {
                    value = module;
                    return;
                }
                if (
                    moment(new Date(module.assignDueDate * 1000)).diff(
                        new Date(),
                        'days',
                    ) < 0
                )
                    return;
                if (
                    moment(new Date(value.assignDueDate * 1000)).diff(
                        new Date(module.assignDueDate * 1000),
                        'days',
                    ) > 0
                ) {
                    value = module;
                }
            });
        });
        return value || { assignDueDate: 0 };
    }, [data]);

    return (
        <ScrollView className="flex-1 bg-white">
            <View className=" py-5 flex flex-col gap-4">
                {loading ? (
                    <View>
                        <Spinner />
                    </View>
                ) : (
                    <>
                        <CourseAlert
                            className=" mx-4 mb-4"
                            hasDeadline={hasDeadline}
                            courseId={id}
                            mostRecentDeadline={mostRecentActivity}
                        />
                        {data?.course.contacts.map(({ fullname, id }) => (
                            <NativeButton className=" mx-4" key={id}>
                                <View className=" flex flex-col gap-2 p-4 border-[0.5px] rounded-2xl border-neutral-80">
                                    <Text className=" font-medium">
                                        {fullname}
                                    </Text>
                                    <Text className=" ml-auto text-primary-50 items-end font-medium">
                                        Lecturer
                                    </Text>
                                </View>
                            </NativeButton>
                        ))}
                        <Text className=" mx-4 mt-4 font-bold text-lg">
                            Course resource
                        </Text>
                        <View className=" mx-4 mt-2 flex flex-col gap-4">
                            {data?.course.contentSections.map(
                                ({ name, summary, courseModules }) => (
                                    <CourseContentAccordion
                                        key={name}
                                        value={{
                                            name,
                                            summary,
                                            course_id: id,
                                            contents: courseModules,
                                        }}
                                    />
                                ),
                            )}
                        </View>
                    </>
                )}
            </View>
        </ScrollView>
    );
}
