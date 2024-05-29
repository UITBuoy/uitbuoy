import { FlatList, View } from 'react-native';
import { useUserEducationProgramQuery } from '../gql/graphql';
import KnowledgeBlockAccordion from './Accordion/KnowledgeBlockAccordion';

export default function EducationProgram() {
    const { data, loading } = useUserEducationProgramQuery();

    return (
        <View>
            {loading ? (
                <></>
            ) : (
                <View className="m-2">
                    <FlatList
                        data={data.userEducationProgram.sections}
                        renderItem={({ item }) => (
                            <KnowledgeBlockAccordion section={item} />
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            )}
        </View>
    );
}
