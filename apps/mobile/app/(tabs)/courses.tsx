import { Spinner } from '@gluestack-ui/themed';
import { useEffect } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CourseItem from '../../src/components/CourseItem/CourseItem';
import CourseSearch from '../../src/components/CourseSearch/CourseSearch';
import PageHeader from '../../src/components/PageHeader/PageHeader';
import { useUserCoursesLazyQuery } from '../../src/gql/graphql';
import CourseListSkeleton from '../../src/skeletons/CourseListSkeleton';
import Animated, { FadeInLeft, FadeOutLeft } from 'react-native-reanimated';

export default function Page() {
    const [fetchCourses, { data: recentCourses, loading, error }] =
        useUserCoursesLazyQuery();

    useEffect(() => {
        fetchCourses({
            variables: { isNew: false, isRecent: true },
        });
    }, []);

    return (
        <View className=" flex-1 bg-white">
            <SafeAreaView style={{ flex: 1 }}>
                <PageHeader />
                <CourseSearch />
                <ScrollView
                    className=" flex-1 mt-6"
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            onRefresh={() => {
                                fetchCourses({
                                    variables: { isNew: true, isRecent: true },
                                    fetchPolicy: 'no-cache',
                                });
                            }}
                        />
                    }
                >
                    <View className=" flex pb-[120px]">
                        {loading ? (
                            <>
                                <CourseListSkeleton />
                            </>
                        ) : (
                            recentCourses?.userCourses.map((course, index) => (
                                <Animated.View
                                    key={course.id}
                                    entering={FadeInLeft.delay(
                                        (index + 1) * 100,
                                    )}
                                    exiting={FadeOutLeft}
                                >
                                    <CourseItem {...course} />
                                </Animated.View>
                            ))
                        )}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}
