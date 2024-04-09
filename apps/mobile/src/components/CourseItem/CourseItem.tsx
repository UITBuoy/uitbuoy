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
}: Partial<Course>) {
    return (
        <TouchableNativeFeedback
            onPress={() => {
                router.push({
                    pathname: `/modals/courseDetail`,
                    params: { display_name, shortname, id },
                });
            }}
        >
            <View
                style={{ borderColor: '#CFCFCF' }}
                className=" border-[0.5px] p-4 px-6 flex flex-row gap-4"
            >
                {/* <Image
                    style={{
                        width: 60,
                        height: 60,
                        backgroundColor: 'red',
                        borderRadius: 8,
                    }}
                    source={{ uri: courseimage }}
                    // contentFit="cover"
                /> */}
                <View className=" flex-1">
                    <Text className=" text-lg font-medium">{display_name}</Text>
                    <Text className=" font-light mt-1">
                        {idnumber || shortname}
                    </Text>
                </View>
            </View>
        </TouchableNativeFeedback>
    );
}
