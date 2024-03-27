import { Spinner } from '@gluestack-ui/themed';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDebounceValue } from 'usehooks-ts';
import CourseSearchResultItem from '../../src/components/CourseSearchResultItem/CourseSearchResultItem';
import TextField from '../../src/components/TextField/TextField';
import { useSearchCoursesQuery } from '../../src/gql/graphql';

export default function Modal() {
    const [text, setText] = useState('');
    const [keyword] = useDebounceValue<string>(text || '', 300);

    const { data, loading, error } = useSearchCoursesQuery({
        variables: { keyword },
        skip: !keyword,
    });

    return (
        <View className=" flex-1 bg-white">
            <SafeAreaView style={{ flex: 1 }}>
                <View className="  mt-4 mx-4 flex flex-row items-center gap-2">
                    <View className=" flex-1 px-4 py-3 rounded-2xl bg-[#F2F2F2] flex flex-row gap-4 items-center">
                        <TextField
                            autoFocus
                            value={text}
                            onChangeText={setText}
                            fieldClassName=" text-sm"
                            title="Search"
                            type="text"
                            placeholder="Search for courses..."
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            router.back();
                        }}
                        className=" flex-grow-0 px-4 py-2"
                    >
                        <Text className=" text-neutral-40">Cancel</Text>
                    </TouchableOpacity>
                </View>
                <View className=" flex-1 mt-4">
                    <ScrollView className=" flex-1">
                        {loading ? (
                            <Spinner size="large" />
                        ) : (
                            data?.userCourses.map((course) => (
                                <CourseSearchResultItem
                                    key={course.id}
                                    {...course}
                                />
                            ))
                        )}
                    </ScrollView>
                </View>
            </SafeAreaView>
        </View>
    );
}