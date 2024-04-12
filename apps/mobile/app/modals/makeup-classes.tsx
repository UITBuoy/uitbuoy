import { useEffect } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import UserMakeupClass from '../../src/components/UserMakeupClass';
import { useUserMakeUpClassQuery } from '../../src/gql/graphql';
import PreviewMakeupClassSkeleton from '../../src/skeletons/PreviewMakeupClassSkeleton';

export default function MakeupClass() {
    const { data, loading, error, refetch } = useUserMakeUpClassQuery();

    useEffect(() => {
        refetch();
    }, []);

    return (
        <View className=" flex-1 bg-white">
            <ScrollView style={{ paddingTop: 20 }} className=" flex-1">
                {loading ? (
                    <PreviewMakeupClassSkeleton />
                ) : (
                    <>
                        <FlatList
                            contentContainerStyle={{
                                flexDirection: 'column',
                                gap: 8,
                            }}
                            scrollEnabled={false}
                            data={data.makeUpClass}
                            renderItem={({ item }) => (
                                <UserMakeupClass makeupClass={item} />
                            )}
                            keyExtractor={(item) => item.title}
                        />
                    </>
                )}
            </ScrollView>
        </View>
    );
}
