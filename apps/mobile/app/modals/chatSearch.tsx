import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInLeft, FadeOutLeft } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDebounceValue } from 'usehooks-ts';
import TextField from '../../src/components/TextField/TextField';
import UserSearchResultItem from '../../src/components/UserSearchResultItem';
import { useSearchUsersQuery } from '../../src/gql/graphql';
import CourseSearchListSkeleton from '../../src/skeletons/CourseSearchListSkeleton';

export default function Modal() {
    const [text, setText] = useState('');
    const [keyword] = useDebounceValue<string>(text || '', 300);

    const { data, loading, error } = useSearchUsersQuery({
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
                            placeholder="Search for user..."
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
                            <CourseSearchListSkeleton />
                        ) : (
                            data?.users.map((user, index) => (
                                <Animated.View
                                    key={user.id}
                                    entering={FadeInLeft.delay(
                                        (index + 1) * 100,
                                    )}
                                    exiting={FadeOutLeft}
                                >
                                    <UserSearchResultItem
                                        {...user}
                                        onPress={() => {}}
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
