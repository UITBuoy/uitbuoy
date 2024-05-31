import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInLeft, FadeOutLeft } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDebounceValue } from 'usehooks-ts';
import CourseSearchResultItem from '../../src/components/CourseSearchResultItem';
import TextField from '../../src/components/TextField/TextField';
import { useSearchCoursesQuery } from '../../src/gql/graphql';
import CourseSearchListSkeleton from '../../src/skeletons/CourseSearchListSkeleton';
import {
    MAX_RECENT_SEARCH_ITEM,
    useRecentSearch,
} from '../../src/stores/recent-search.store';
import CourseSearchRecentItem from '../../src/components/CourseSearchRecentItem';

export default function Modal() {
    const [text, setText] = useState('');
    const [keyword] = useDebounceValue<string>(text || '', 300);

    const { recentSearchStrings, addSearchString } = useRecentSearch();

    const { data, loading, error } = useSearchCoursesQuery({
        variables: { keyword, isNew: false, isRecent: false },
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
                        {recentSearchStrings
                            .filter(
                                (value) =>
                                    value.includes(text) && value != text,
                            )
                            .slice(0, MAX_RECENT_SEARCH_ITEM)
                            .map((recentText) => (
                                <CourseSearchRecentItem
                                    onPress={() => setText(recentText)}
                                    key={recentText}
                                    text={recentText}
                                />
                            ))}
                        {loading ? (
                            <CourseSearchListSkeleton />
                        ) : (
                            data?.userCourses.map((course, index) => (
                                <Animated.View
                                    key={course.id}
                                    entering={FadeInLeft.delay(
                                        (index + 1) * 100,
                                    )}
                                    exiting={FadeOutLeft}
                                >
                                    <CourseSearchResultItem
                                        {...course}
                                        onPress={() => {
                                            addSearchString(text);
                                        }}
                                    />
                                </Animated.View>
                            ))
                        )}
                    </ScrollView>
                </View>
            </SafeAreaView>
        </View>
    );
}
