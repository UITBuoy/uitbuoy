import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageHeader from '../../src/components/PageHeader/PageHeader';
import CourseSearch from '../../src/components/CourseSearch/CourseSearch';

export default function Page() {
    return (
        <View className=" flex-1 bg-white">
            <SafeAreaView>
                <PageHeader />
                <CourseSearch />
                <ScrollView>
                    <View className=" flex flex-col gap-10 pb-[100px]"></View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}
