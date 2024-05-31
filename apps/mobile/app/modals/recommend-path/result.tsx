import { useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SemesterProgramAccordion from '../../../src/components/Accordion/SemesterProgramAccordion';
import { useRecommendLearningPathQuery } from '../../../src/gql/graphql';
import { useSubjectSelection } from '../../../src/stores/subject-selection.store';

export default function Page() {
    const { subjects, removeAll } = useSubjectSelection();
    const { data, loading } = useRecommendLearningPathQuery({
        variables: {
            selectedSubjectCodes: subjects.map((s) => s.code),
        },
    });

    useEffect(() => {
        removeAll();
    }, []);

    return (
        <View className=" flex-1 bg-white">
            <SafeAreaView style={{ flex: 1, paddingBottom: 20 }}>
                <Text className=" mt-4 mx-4 font-semibold text-xl">
                    Lộ trình học đề xuất
                </Text>
                <Text className=" mt-2 mx-4 text-neutral-40">
                    Danh sách các môn học chỉ mang tính tham khảo
                </Text>
                {loading ? (
                    <></>
                ) : (
                    <View className=" pt-4 flex-1 m-2">
                        <FlatList
                            data={data.recommendLearningPath}
                            renderItem={({ item }) => (
                                <SemesterProgramAccordion program={item} />
                            )}
                            keyExtractor={(item) => item.index.toString()}
                        />
                    </View>
                )}
            </SafeAreaView>
        </View>
    );
}
