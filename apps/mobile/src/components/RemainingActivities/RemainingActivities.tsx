import { Image } from 'expo-image';
import { Text, TouchableNativeFeedback, View } from 'react-native';
import EMPTY_REMAINING_ACTIVITIES from '../../../assets/empty-remaining-activities.png';
import { useUserEventsQuery } from '../../gql/graphql';
import moment from 'moment';

export default function RemainingActivities() {
    const { data, loading, error } = useUserEventsQuery();

    return (
        <View className=" mt-0">
            <Text className=" mx-4 text-base font-semibold">
                Remaining activities
            </Text>
            <View className=" py-5">
                {data?.userEvents.map(({ activityname, timestart, course }) => (
                    <TouchableNativeFeedback>
                        <View className=" px-4 py-4 ">
                            <View className="flex-1 flex flex-row justify-between items-center gap-4">
                                <View className=" w-4/5 flex flex-col gap-1">
                                    <Text className=" text-zinc-500 text-sm">
                                        {new Intl.DateTimeFormat('en-GB', {
                                            dateStyle: 'full',
                                            timeStyle: 'short',
                                            timeZone: 'Asia/Ho_Chi_Minh',
                                        }).format(new Date(timestart * 1000))}
                                    </Text>
                                    <Text className=" text-sm text-zinc-500">
                                        {course.fullname.split(' - ').at(0)}
                                    </Text>
                                    <Text className=" text-base font-medium">
                                        {activityname}
                                    </Text>
                                </View>
                                <View className=" flex flex-col items-center gap-1">
                                    <Text
                                        className={` w-12 h-12 pt-2 flex justify-center items-center rounded-full bg-primary-70 text-white text-center font-semibold text-xl`}
                                    >
                                        {moment(
                                            new Date(timestart * 1000),
                                        ).diff(moment(new Date()), 'days')}
                                    </Text>
                                    <Text className=" text-zinc-500">
                                        days left
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                ))}
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