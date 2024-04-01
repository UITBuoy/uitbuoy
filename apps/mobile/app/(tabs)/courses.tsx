import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageHeader from '../../src/components/PageHeader/PageHeader';
import CourseSearch from '../../src/components/CourseSearch/CourseSearch';
import { useUserCoursesQuery } from '../../src/gql/graphql';
import CourseItem from '../../src/components/CourseItem/CourseItem';
import { Spinner } from '@gluestack-ui/themed';

export default function Page() {
    const {
        data: recentCourses,
        loading,
        error,
    } = useUserCoursesQuery({
        variables: { isNew: true, isRecent: true },
    });

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
