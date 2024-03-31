import { Text, TouchableNativeFeedback, View } from 'react-native';
import { Course } from '../../gql/graphql';
import SearchIcon from '../../icons/search';
import { router } from 'expo-router';

export default function CourseSearchResultItem({
    display_name,
    shortname,
    id,
}: Pick<Course, 'display_name' | 'shortname' | 'id'>) {
    return (
        <TouchableNativeFeedback
            onPress={() => {
                router.push({
                    pathname: `/modals/courseDetail`,
                    params: { display_name, shortname, id },
                });
            }}
        >
            <View className=" px-5 py-2 flex flex-row gap-4">
                <SearchIcon className=" mt-2" scale={1.4} />
                <View className="">
                    <Text className=" text-lg font-medium">{display_name}</Text>
                    <Text className=" mt-1">{shortname}</Text>
                </View>
            </View>
        </TouchableNativeFeedback>
    );
}
