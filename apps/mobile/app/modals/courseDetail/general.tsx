import { useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, TouchableNativeFeedback, View } from 'react-native';
import { useGeneralDetailCourseQuery } from '../../../src/gql/graphql';
import NativeButton from '../../../src/components/NativeButton/NativeButton';

type Props = {
    id: number;
};

export default function GeneralPage({ id }: Props) {
    const { data, loading, error } = useGeneralDetailCourseQuery({
        variables: { id },
    });

    return (
        <ScrollView className=" px-4 flex-1 bg-white">
            <View className=" py-5 flex flex-col gap-4">
                {data?.course.contacts.map(({ fullname, id }) => (
                    <NativeButton key={id}>
                        <View className=" flex flex-col gap-2 p-4 border-[0.5px] rounded-2xl border-neutral-80">
                            <Text className=" font-medium">{fullname}</Text>
                            <Text className=" ml-auto text-primary-50 items-end font-medium">
                                Lecturer
                            </Text>
                        </View>
                    </NativeButton>
                ))}
            </View>
        </ScrollView>
    );
}
