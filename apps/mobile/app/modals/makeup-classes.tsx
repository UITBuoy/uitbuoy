import { useEffect, useState } from 'react';
import { FlatList, RefreshControl, ScrollView, View } from 'react-native';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';
import UserMakeupClass from '../../src/components/UserMakeupClass';
import { useUserMakeUpClassQuery } from '../../src/gql/graphql';
import PreviewMakeupClassSkeleton from '../../src/skeletons/PreviewMakeupClassSkeleton';

export default function MakeupClass() {
    const { data, loading, error, refetch } = useUserMakeUpClassQuery();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        refetch();
    }, []);

    return (
        <View className=" flex-1 bg-white">
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={async () => {
                            setIsLoading(true);
                            await refetch();
                            setIsLoading(false);
                        }}
                    />
                }
                style={{ paddingTop: 20 }}
                className=" flex-1"
            >
                {loading || isLoading || !data?.makeUpClass ? (
                    <PreviewMakeupClassSkeleton />
                ) : (
                    <Animated.View entering={FadeInUp} exiting={FadeOutUp}>
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
                    </Animated.View>
                )}
            </ScrollView>
        </View>
    );
}
