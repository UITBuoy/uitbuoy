import { Image as ExpoImage } from 'expo-image';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Image, RefreshControl, ScrollView, Text, View } from 'react-native';
import Animated, { FadeInLeft, FadeOutRight } from 'react-native-reanimated';
import EMPTY_REMAINING_ACTIVITIES from '../../../assets/empty-remaining-activities.png';
import GREEN_CALENDAR from '../../../assets/green-calendar.png';
import RED_CALENDAR from '../../../assets/red-calendar.png';
import NativeButton from '../../../src/components/NativeButton/NativeButton';
import {
    Assignment,
    useGeneralDetailCourseLazyQuery,
} from '../../../src/gql/graphql';
import AssignIcon from '../../../src/icons/assign';
import ActivitiesDetailCourseSkeleton from '../../../src/skeletons/ActivitiesDetailCourseSkeleton';

type Props = {
    id: number;
};

export default function ActitivitiesPage({ id }: Props) {
    const [refetch, { data, loading, error }] = useGeneralDetailCourseLazyQuery(
        {
            variables: { id },
        },
    );

    const assignments = data
        ? [...data.course.assignments].sort((a, b) => a.duedate - b.duedate)
        : [];

    const inComingAssignments = assignments.filter(
        (assignment) => assignment.duedate * 1000 > new Date().getTime(),
    );

    const dueAssignments = assignments.filter(
        (assignment) => assignment.duedate * 1000 <= new Date().getTime(),
    );

    useEffect(() => {
        refetch();
    }, []);

    return (
        <ScrollView
            className="flex-1 bg-white"
            refreshControl={
                <RefreshControl
                    refreshing={loading}
                    onRefresh={() => refetch({ fetchPolicy: 'no-cache' })}
                />
            }
        >
            <View className=" py-5 flex flex-col gap-4">
                {loading ? (
                    <ActivitiesDetailCourseSkeleton />
                ) : (
                    <>
                        {inComingAssignments.length ? (
                            <>
                                <Animated.View
                                    entering={FadeInLeft}
                                    exiting={FadeOutRight}
                                    className=" mx-4 mt-4 mb-2 flex flex-row gap-3"
                                >
                                    <Image source={GREEN_CALENDAR} />
                                    <Text className=" font-bold text-lg">
                                        Bài tập sắp tới hạn
                                    </Text>
                                </Animated.View>
                                {inComingAssignments.map(
                                    (assignment, index) => (
                                        <Animated.View
                                            key={assignment.name}
                                            entering={FadeInLeft.delay(
                                                (index + 1) * 100,
                                            )}
                                            exiting={FadeOutRight}
                                        >
                                            <ActivityItem
                                                assignment={assignment}
                                            />
                                        </Animated.View>
                                    ),
                                )}
                            </>
                        ) : null}
                        {dueAssignments.length ? (
                            <>
                                {' '}
                                <Animated.View
                                    entering={FadeInLeft.delay(
                                        (inComingAssignments.length + 2) * 100,
                                    )}
                                    exiting={FadeOutRight}
                                    className=" mx-4 mt-4 mb-2 flex flex-row gap-3"
                                >
                                    <Image source={RED_CALENDAR} />
                                    <Text className=" font-bold text-lg">
                                        Bài tập quá hạn nộp
                                    </Text>
                                </Animated.View>
                                {dueAssignments.map((assignment, index) => (
                                    <Animated.View
                                        key={assignment.name}
                                        entering={FadeInLeft.delay(
                                            (index +
                                                inComingAssignments.length +
                                                3) *
                                                100,
                                        )}
                                        exiting={FadeOutRight}
                                    >
                                        <ActivityItem assignment={assignment} />
                                    </Animated.View>
                                ))}
                            </>
                        ) : null}
                    </>
                )}
            </View>
            {assignments.length === 0 ? (
                <View>
                    <ExpoImage
                        style={{
                            flex: 1,
                            width: '100%',
                            height: 230,
                            marginTop: 20,
                        }}
                        transition={1000}
                        source={EMPTY_REMAINING_ACTIVITIES}
                    />
                    <Text className=' text-center text-lg font-medium'>Không có bài tập nào</Text>
                </View>
            ) : null}
        </ScrollView>
    );
}

function ActivityItem({
    assignment: { cmid, course, name, duedate },
}: {
    assignment: Assignment;
}) {
    return (
        <NativeButton
            className=" mx-4"
            onPress={() => {
                router.push({
                    pathname: '/modals/detail-activity',
                    params: {
                        id: cmid,
                        assignment_id: cmid,
                        course_id: course,
                    },
                });
            }}
        >
            <View className=" flex flex-row gap-3 p-6 px-4 border-[0.5px] rounded-2xl border-neutral-80">
                <AssignIcon />
                <View className="flex-1">
                    <Text className=" font-medium">{name}</Text>
                    <Text className=" mt-2 font-light">
                        {new Intl.DateTimeFormat('vi-VN', {
                            dateStyle: 'full',
                            timeStyle: 'short',
                            timeZone: 'Asia/Ho_Chi_Minh',
                        }).format(new Date(duedate * 1000))}
                    </Text>
                </View>
            </View>
        </NativeButton>
    );
}
