import { FlatList, View } from 'react-native';
import { useUserEducationProgramQuery } from '../gql/graphql';
import KnowledgeBlock from './KnowledgeBlock';

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
                            <KnowledgeBlock section={item} />
                        )}
                    />
                </View>
            )}
        </View>
    );
}
