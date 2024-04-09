import { Image } from 'expo-image';
import { Text, TouchableNativeFeedback, View } from 'react-native';
import EMPTY_REMAINING_ACTIVITIES from '../../../assets/empty-remaining-activities.png';
import { useUserEventsQuery } from '../../gql/graphql';
import moment from 'moment';
import { router } from 'expo-router';
import Animated, { FadeInLeft, FadeOutLeft } from 'react-native-reanimated';
import { timeDiff } from '../../utils/timeDiff';

export default function RemainingActivities() {
    const { data, loading, error } = useUserEventsQuery();

    return (
        <View className=" flex-1 mt-0">
            <Text className=" mx-4 text-base font-semibold">
                Remaining activities
            </Text>
            <View className=" flex-1 py-5">
                {data?.userEvents.map(
                    ({ id, activityname, timestart, course }, i) => (
                        <Animated.View
                            key={id}
                            entering={FadeInLeft.delay((i + 1) * 100)}
                            exiting={FadeOutLeft}
                            className=" flex-1"
                        >
                            <TouchableNativeFeedback
                                onPress={() => {
                                    router.push({
                                        pathname: '/modals/detail-activity',
                                        params: {
                                            id,
                                            assignment_id:
                                                data.userEvents[i].instance,
                                            course_id:
                                                data.userEvents[i].course.id,
                                        },
                                    });
                                }}
                            >
                                <View
                                    style={{ borderColor: '#CFCFCF' }}
                                    className=" flex-1 px-4 py-4 border-[0.5px]"
                                >
                                    <View className="flex-1 flex flex-col justify-between items-start gap-4">
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
                    ),
                )}
                {data?.userEvents.length === 0 && !loading ? (
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
