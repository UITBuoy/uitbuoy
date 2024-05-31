import { FlatList, RefreshControl, ScrollView, View } from 'react-native';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';
import UserMakeupClass from '../../src/components/UserMakeupClass';
import PreviewMakeupClassSkeleton from '../../src/skeletons/PreviewMakeupClassSkeleton';
import { useMakeupClass } from '../../src/stores/makeup-class.store';

export default function MakeupClass() {
    const { classes, refetch, loading } = useMakeupClass();

    return (
        <View className=" flex-1 bg-white">
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={async () => {
                            await refetch();
                        }}
                    />
                }
                style={{ paddingTop: 20 }}
                className=" flex-1"
            >
                {loading || loading || !classes ? (
                    <PreviewMakeupClassSkeleton />
                ) : (
                    <Animated.View entering={FadeInUp} exiting={FadeOutUp}>
                        <FlatList
                            contentContainerStyle={{
                                flexDirection: 'column',
                                gap: 8,
                            }}
                            scrollEnabled={false}
                            data={classes}
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
