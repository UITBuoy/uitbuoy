import { Spinner } from '@gluestack-ui/themed';
import { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CourseItem from '../../src/components/CourseItem/CourseItem';
import CourseSearch from '../../src/components/CourseSearch/CourseSearch';
import PageHeader from '../../src/components/PageHeader/PageHeader';
import { useUserCoursesLazyQuery } from '../../src/gql/graphql';

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
                <ScrollView className=" flex-1 mt-6">
                    <View className=" flex flex-col gap-4 pb-[120px]">
                        {loading ? (
                            <Spinner size="large" />
                        ) : (
                            recentCourses?.userCourses.map((course) => (
                                <CourseItem key={course.id} {...course} />
                            ))
                        )}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}
