import { Spinner } from '@gluestack-ui/themed';
import { router, useGlobalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import {
    RefreshControl,
    ScrollView,
    Text,
    useWindowDimensions,
    View,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import NativeButton from '../../src/components/NativeButton/NativeButton';
import {
    useDetailAssignmentCourseLazyQuery,
    useDetailAssignmentCourseQuery,
} from '../../src/gql/graphql';
import { useViewFile } from '../../src/hooks/file/useViewFile';
import AssignIcon from '../../src/icons/assign';
import { useAuth } from '../../src/stores/auth.store';
import ActivityScreenSkeleton from '../../src/skeletons/ActivityScreenSkeleton';
import Animated, {
    FadeIn,
    FadeInDown,
    FadeInUp,
    FadeOut,
    FadeOutUp,
} from 'react-native-reanimated';

export default function DetailActivity() {
    const { width } = useWindowDimensions();
    const { authData } = useAuth();

    const params = useGlobalSearchParams<{
        course_id: string;
        assignment_id: string;
    }>();

    const viewFile = useViewFile();

    const [refetch, { data, loading, error }] =
        useDetailAssignmentCourseLazyQuery({
            variables: {
                id: parseInt(params.course_id, 10),
                assignment_id: parseInt(params.assignment_id, 10),
            },
            fetchPolicy: 'cache-first',
        });

    const assignment = data?.assignmentCourse?.assignment;

    useEffect(() => {
        refetch();
    }, []);

    return (
        <View className=" flex-1 bg-white pt-4">
            {loading || !assignment ? (
                <ActivityScreenSkeleton />
            ) : (
                <View className=" flex-1">
                    <ScrollView
                        className=" flex-1"
                        refreshControl={
                            <RefreshControl
                                refreshing={loading}
                                onRefresh={() =>
                                    refetch({ fetchPolicy: 'no-cache' })
                                }
                            />
                        }
                    >
                        <Animated.View
                            className=" mx-4"
                            entering={FadeInUp}
                            exiting={FadeOutUp}
                        >
                            <NativeButton
                                key={data.assignmentCourse.id}
                                onPress={() => {
                                    router.push({
                                        pathname: `/modals/courseDetail`,
                                        params: { ...data.assignmentCourse },
                                    });
                                }}
                            >
                                <View className=" bg-primary-95 flex flex-col gap-1 p-3 border-[0.5px] rounded-2xl border-neutral-80">
                                    <Text className=" text-primary-50">
                                        {data.assignmentCourse.shortname}
                                    </Text>
                                    <Text className=" text-primary-50 font-medium">
                                        {data.assignmentCourse.display_name}
                                    </Text>
                                </View>
                            </NativeButton>
                        </Animated.View>
                        <View className=" mt-10 flex-1 flex-col gap-6">
                            <Animated.View
                                className=" px-4 w-full flex-row items-center gap-3"
                                entering={FadeIn.delay(200)}
                                exiting={FadeOut}
                            >
                                <View className=" pt-0">
                                    <AssignIcon scale={1.2} />
                                </View>
                                <Text className=" flex-1 text-xl font-medium">
                                    {assignment.name}
                                </Text>
                            </Animated.View>
                            <View className=" mt-4 flex-col gap-4 bg-neutral-99 p-4">
                                <Animated.View
                                    className=" flex-row items-center gap-4"
                                    entering={FadeIn.delay(300)}
                                    exiting={FadeOut}
                                >
                                    <Text className=" w-[80px] p-1 rounded-lg text-center bg-[#71eda7] text-black font-medium">
                                        Opened
                                    </Text>
                                    <Text className=" font-medium">
                                        {new Intl.DateTimeFormat('vi-VN', {
                                            dateStyle: 'full',
                                            timeStyle: 'short',
                                            timeZone: 'Asia/Ho_Chi_Minh',
                                        }).format(
                                            new Date(
                                                assignment.allowsubmissionsfromdate *
                                                    1000,
                                            ),
                                        )}
                                    </Text>
                                </Animated.View>
                                <Animated.View
                                    className=" flex-row items-center gap-4"
                                    entering={FadeIn.delay(400)}
                                    exiting={FadeOut}
                                >
                                    <Text className=" w-[80px] p-1 rounded-lg text-center bg-[#fd6969] text-white font-medium">
                                        Due
                                    </Text>
                                    <Text className=" font-medium">
                                        {new Intl.DateTimeFormat('vi-VN', {
                                            dateStyle: 'full',
                                            timeStyle: 'short',
                                            timeZone: 'Asia/Ho_Chi_Minh',
                                        }).format(
                                            new Date(assignment.duedate * 1000),
                                        )}
                                    </Text>
                                </Animated.View>
                                <View className=" mt-2 mb-2 border-b-neutral-50 border-b-[0.5px]" />
                                <Animated.View
                                    className=""
                                    entering={FadeIn.delay(500)}
                                    exiting={FadeOut}
                                >
                                    <RenderHtml
                                        contentWidth={width - 50}
                                        baseStyle={{
                                            padding: 0,
                                            marginVertical: 0,
                                        }}
                                        tagsStyles={{
                                            img: { padding: 0, margin: 10 },
                                            p: { padding: 0, margin: 5 },
                                        }}
                                        source={{
                                            html: assignment.intro.replace(
                                                /src="(.*?)"/g,
                                                `src="$1?token=${authData.token}"`,
                                            ),
                                        }}
                                    />
                                </Animated.View>
                            </View>
                        </View>
                        <View className=" w-full mt-4 mx-4 flex-row flex-wrap">
                            {[
                                ...assignment.introfiles,
                                ...assignment.introattachments,
                            ].map((file) => (
                                <NativeButton
                                    key={file.filename}
                                    borderRadius={6}
                                    className=" m-2"
                                    onPress={() => viewFile(file)}
                                >
                                    <View className=" self-start py-1 px-3 border-[1px] border-primary-60 rounded-lg">
                                        <Text className=" w-fit text-primary-60">
                                            {file.filename}
                                        </Text>
                                    </View>
                                </NativeButton>
                            ))}
                        </View>
                    </ScrollView>
                    <View className=" mt-auto px-4 pb-10 pt-6 flex-row gap-4">
                        <NativeButton className=" flex-1">
                            <View className=" p-3 border-[1px] border-primary-60 rounded-2xl flex-col items-center">
                                <Text className=" font-semibold text-primary-60">
                                    Upload
                                </Text>
                            </View>
                        </NativeButton>
                        <NativeButton className=" flex-1">
                            <View className=" p-3 bg-primary-60 rounded-2xl flex-col items-center">
                                <Text className=" font-semibold text-white">
                                    Submit
                                </Text>
                            </View>
                        </NativeButton>
                    </View>
                </View>
            )}
        </View>
    );
}
