import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { Course } from '../gql/graphql';
import { useDeadline } from '../hooks/course/useDeadline';
import NativeButton from './NativeButton/NativeButton';

export default function RecentCourseItem({
    display_name,
    idnumber,
    shortname,
    id,
}: Partial<Course>) {
    const { hasDeadline, loading } = useDeadline(id);

    return (
        <NativeButton
            onPress={() => {
                router.push({
                    pathname: `/modals/courseDetail`,
                    params: { display_name, shortname, id },
                });
            }}
        >
            <View
                style={{
                    borderRightColor: '#CFCFCF',
                    borderTopColor: '#CFCFCF',
                    borderBottomColor: '#CFCFCF',
                    width: 250,
                    height: 150,
                    borderLeftColor: loading
                        ? '#CFCFCF'
                        : hasDeadline
                          ? '#FE5050'
                          : '#44E187',
                    borderLeftWidth: 10,
                }}
                className=" border-[0.5px] rounded-2xl p-4 px-6 flex-row gap-4"
            >
                <View className=" flex-1 flex flex-col justify-between">
                    <Text className=" text-lg font-medium">{display_name}</Text>
                    <Text className=" font-light mt-1">
                        {idnumber || shortname}
                    </Text>
                </View>
                {/* {loading ? (
                    <DeadlineSkeleton />
                ) : (
                    <View className=" absolute" style={{ right: 5, bottom: 5 }}>
                        {hasDeadline ? (
                            <Image
                                source={HAS_DEADLINE_ICON}
                                style={{ width: 50, height: 30 }}
                            />
                        ) : (
                            <Image
                                source={REST_TIME_RIGHT}
                                style={{ width: 40, height: 40 }}
                            />
                        )}
                    </View>
                )} */}
            </View>
        </NativeButton>
    );
}
