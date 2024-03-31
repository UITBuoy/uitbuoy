import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Text, TouchableNativeFeedback, View } from 'react-native';
import { Course } from '../../gql/graphql';

export default function CourseItem({
    fullname,
    display_name,
    idnumber,
    shortname,
    courseimage,
    id,
}: Pick<
    Course,
    | 'fullname'
    | 'display_name'
    | 'idnumber'
    | 'shortname'
    | 'courseimage'
    | 'id'
>) {
    return (
        <TouchableNativeFeedback
            onPress={() => {
                router.push(`/courses/${id}`);
            }}
        >
            <View className=" mx-4 border-[0.5px] rounded-2xl p-4 flex flex-row gap-4">
                <Image
                    style={{
                        width: 60,
                        // height: 60,
                        backgroundColor: 'red',
                        borderRadius: 8,
                    }}
                    source={{ uri: courseimage }}
                    contentFit="contain"
                />
                <View className=" flex-1">
                    <Text className=" text-lg font-semibold">
                        {display_name}
                    </Text>
                    <Text className=" font-medium mt-1">
                        {idnumber || shortname}
                    </Text>
                </View>
            </View>
        </TouchableNativeFeedback>
    );
}
