import { router } from 'expo-router';
import { useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import KnowledgeBlockSelectionAccordion from '../../../src/components/Accordion/KnowledgeBlockSelectionAccordion';
import Chip from '../../../src/components/Chip';
import PrimaryButton from '../../../src/components/PrimaryButton';
import { useUserEducationProgramQuery } from '../../../src/gql/graphql';
import { useSubjectSelection } from '../../../src/stores/subject-selection.store';

export default function Page() {
    const { data, loading } = useUserEducationProgramQuery();
    const { subjects, removeAll } = useSubjectSelection();

    useEffect(() => {
        removeAll();
    }, []);

    return (
        <View className=" flex-1 bg-white">
            <SafeAreaView style={{ flex: 1, paddingBottom: 20 }}>
                <Text className=" mt-4 mx-4 font-semibold text-xl">
                    Chọn các môn học tự chọn
                </Text>
                <Text className=" mt-2 mx-4 text-neutral-40">
                    Chọn các môn học tự chọn trong từng khối kiến thức để hệ
                    thống gợi ý danh sách các môn học trước và lộ trình học hợp
                    lý
                </Text>
                <View className=" flex-row mt-4 mx-4">
                    <Chip
                        style={{
                            backgroundColor: 'white',
                            borderWidth: 0.5,
                            borderColor: 'black',
                        }}
                    >
                        <Text className=" text-black font-medium">
                            Đã chọn {subjects.length} môn
                        </Text>
                    </Chip>
                </View>
                {loading ? (
                    <></>
                ) : (
                    <View className=" pt-4 flex-1 m-2">
                        <FlatList
                            data={data.userEducationProgram.sections.filter(
                                (section) =>
                                    section.subjects.some((s) => !s.isRequired),
                            )}
                            renderItem={({ item }) => (
                                <KnowledgeBlockSelectionAccordion
                                    section={item}
                                />
                            )}
                            keyExtractor={(item) => item.id}
                        />
                    </View>
                )}
                <PrimaryButton
                    isFullWidth
                    className=" mx-2"
                    onPress={() => {
                        router.push('/modals/recommend-path/result');
                    }}
                >
                    <Text className=" flex-1 text-lg font-medium text-white text-center">
                        Hoàn tất
                    </Text>
                </PrimaryButton>
            </SafeAreaView>
        </View>
    );
}
