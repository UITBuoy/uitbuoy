import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Text, TouchableNativeFeedback, View } from 'react-native';
import Animated, { FadeInLeft, FadeOutLeft } from 'react-native-reanimated';
import EMPTY_REMAINING_ACTIVITIES from '../../assets/empty-remaining-activities.png';
import REFRESH_ICON from '../../assets/white-refresh.png';
import EventListSkeleton from '../skeletons/EventListSkeleton';
import { useEvents } from '../stores/event.store';
import { timeDiff } from '../utils/timeDiff';
import NativeButton from './NativeButton/NativeButton';

export default function RemainingActivities() {
    // const { data, loading, error, refetch } = useUserEventsQuery();
    // const [isLoading, setIsLoading] = useState(false);
    const { events, refetch, loading } = useEvents();

    useEffect(() => {
        // refetch({ isNew: true });
    }, []);

    return (
        <View className=" flex mt-0">
            <View className=" mx-4 flex-row justify-between items-center">
                <Text className=" text-base font-semibold">
                    Các bài tập sắp đến hạn
                </Text>
                <NativeButton
                    onPress={() => {
                        refetch({ variables: { isNew: true } });
                    }}
                >
                    <View className=" flex-row gap-2 p-2 px-3 bg-primary-70 ">
                        <Image
                            style={{ width: 20, height: 20 }}
                            source={REFRESH_ICON}
                        />
                        <Text className=" text-white text-sm font-medium">
                            Reload
                        </Text>
                    </View>
                </NativeButton>
            </View>
            <View className=" flex py-5">
                {loading ? (
                    <EventListSkeleton />
                ) : (
                    events.map(({ id, activityname, timestart, course }, i) => (
                        <Animated.View
                            key={id}
                            entering={FadeInLeft.delay((i + 1) * 100)}
                            exiting={FadeOutLeft}
                            className=" flex"
                        >
                            <TouchableNativeFeedback
                                onPress={() => {
                                    router.push({
                                        pathname: '/modals/detail-activity',
                                        params: {
                                            id,
                                            assignment_id: events[i].instance,
                                            course_id: events[i].course.id,
                                        },
                                    });
                                }}
                            >
                                <View
                                    style={{ borderColor: '#CFCFCF' }}
                                    className=" flex px-4 py-4 border-[0.5px]"
                                >
                                    <View className=" flex flex-col justify-between items-start gap-4">
                                        <View className=" flex flex-row gap-2">
                                            <Text
                                                className={` px-3 py-1 flex justify-center items-center rounded-lg bg-primary-70 text-white text-center font-medium text-sm`}
                                            >
                                                {
                                                    -timeDiff(
                                                        new Date(
                                                            timestart * 1000,
                                                        ),
                                                    ).time
                                                }{' '}
                                                {
                                                    timeDiff(
                                                        new Date(
                                                            timestart * 1000,
                                                        ),
                                                    ).type
                                                }
                                            </Text>
                                        </View>
                                        <View className=" flex flex-col gap-1">
                                            <Text className=" text-sm text-zinc-500">
                                                {course.fullname
                                                    .split(' - ')
                                                    .at(0)}
                                            </Text>
                                            <Text className=" text-lg font-medium">
                                                {activityname}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableNativeFeedback>
                        </Animated.View>
                    ))
                )}
                {events.length === 0 && !loading ? (
                    <Image
                        style={{
                            flex: 1,
                            width: '100%',
                            height: 230,
                            marginTop: 20,
                        }}
                        contentFit="contain"
                        transition={1000}
                        source={EMPTY_REMAINING_ACTIVITIES}
                    />
                ) : null}
            </View>
        </View>
    );
}
