import { Spinner } from '@gluestack-ui/themed';
import { RefreshControl, ScrollView, Text, View } from 'react-native';
import CourseContentAccordion from '../../../src/components/Accordion/CourseContentAccordion';
import CourseAlert from '../../../src/components/CourseAlert/CourseAlert';
import NativeButton from '../../../src/components/NativeButton/NativeButton';
import {
    useGeneralDetailCourseLazyQuery,
    useGeneralDetailCourseQuery,
} from '../../../src/gql/graphql';
import { useDeadline } from '../../../src/hooks/course/useDeadline';
import { useEffect } from 'react';
import GeneralDetailCourseSkeleton from '../../../src/skeletons/GeneralDetailCourseSkeleton';
import Animated, {
    FadeInUp,
    FadeOutDown,
    FadeOutUp,
} from 'react-native-reanimated';

type Props = {
    id: number;
};

export default function GeneralPage({ id }: Props) {
    const [refetch, { data, loading, error }] =
        useGeneralDetailCourseLazyQuery();
    const { hasDeadline, mostRecentActivity } = useDeadline(id);

    useEffect(() => {
        refetch({
            variables: { id },
        });
    }, []);

    return (
        <ScrollView
            className="flex-1 bg-white"
            refreshControl={
                <RefreshControl
                    refreshing={loading}
                    onRefresh={() => {
                        refetch({
                            variables: { id },
                            fetchPolicy: 'network-only',
                        });
                    }}
                />
            }
        >
            <View className=" py-5 flex flex-col gap-4">
                {loading ? (
                    <GeneralDetailCourseSkeleton />
                ) : (
                    <>
                        <CourseAlert
                            className=" mt-6 mx-4 mb-4"
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
                        <Animated.Text
                            entering={FadeInUp}
                            exiting={FadeOutDown}
                            className=" mx-4 mt-4 font-bold text-lg"
                        >
                            Course resource
                        </Animated.Text>
                        <View className=" mx-4 mt-2 flex flex-col gap-4">
                            {data?.course.contentSections.map(
                                ({ name, summary, courseModules }, index) => (
                                    <Animated.View
                                        key={name}
                                        entering={FadeInUp.delay(
                                            (index + 1) * 100,
                                        )}
                                        exiting={FadeOutDown.delay(
                                            (index + 1) * 100,
                                        )}
                                    >
                                        <CourseContentAccordion
                                            value={{
                                                name,
                                                summary,
                                                course_id: id,
                                                contents: courseModules,
                                            }}
                                        />
                                    </Animated.View>
                                ),
                            )}
                        </View>
                    </>
                )}
            </View>
        </ScrollView>
    );
}
