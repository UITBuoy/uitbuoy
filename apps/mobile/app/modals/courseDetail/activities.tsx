import { Spinner } from '@gluestack-ui/themed';
import { router } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import NativeButton from '../../../src/components/NativeButton/NativeButton';
import { useGeneralDetailCourseQuery } from '../../../src/gql/graphql';
import AssignIcon from '../../../src/icons/assign';

type Props = {
    id: number;
};

export default function ActitivitiesPage({ id }: Props) {
    const { data, loading, error } = useGeneralDetailCourseQuery({
        variables: { id },
    });

    return (
        <ScrollView className="flex-1 bg-white">
            <View className=" py-5 flex flex-col gap-4">
                {loading ? (
                    <View>
                        <Spinner />
                    </View>
                ) : (
                    <>
                        {data?.course.assignments.map(
                            ({ cmid, course, name, duedate }) => (
                                <NativeButton
                                    className=" mx-4"
                                    key={name}
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
                                            <Text className=" font-medium">
                                                {name}
                                            </Text>
                                            <Text className=" mt-2 font-light">
                                                {new Intl.DateTimeFormat(
                                                    'vi-VN',
                                                    {
                                                        dateStyle: 'full',
                                                        timeStyle: 'short',
                                                        timeZone:
                                                            'Asia/Ho_Chi_Minh',
                                                    },
                                                ).format(
                                                    new Date(duedate * 1000),
                                                )}
                                            </Text>
                                        </View>
                                    </View>
                                </NativeButton>
                            ),
                        )}
                    </>
                )}
            </View>
        </ScrollView>
    );
}
