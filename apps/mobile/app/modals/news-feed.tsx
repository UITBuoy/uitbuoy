import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import NewsFeedItem from '../../src/components/NewsFeedItem';
import { NewsFeed, useGeneralNewsFeedLazyQuery } from '../../src/gql/graphql';

export default function NewsFeedModal() {
    const [page, setPage] = useState(0);
    const [news, setNews] = useState<NewsFeed[]>([]);

    const [refetch, { data, loading }] = useGeneralNewsFeedLazyQuery();

    useEffect(() => {
        refetch({
            variables: { limit: 5, skip: 0 },
            onCompleted(data) {
                setNews(data.newsFeed);
                setPage(1);
            },
        });
    }, []);

    return (
        <View
            style={{ backgroundColor: '#EFEFEF' }}
            className=" flex-1 bg-white"
        >
            <SafeAreaView style={{ flex: 1 }}>
                <Text className=" font-semibold text-xl mx-4">News</Text>
                <View className=" mt-4 flex-1">
                    <View className=" flex-1" style={{ paddingVertical: 10 }}>
                        {loading && news.length === 0 ? (
                            <View></View>
                        ) : (
                            <FlatList
                                data={news}
                                keyExtractor={(item) => item.title}
                                renderItem={({ item, index }) => (
                                    <Animated.View
                                        entering={FadeInUp.delay(
                                            index * 70 + 100,
                                        )}
                                        exiting={FadeOutUp}
                                    >
                                        <NewsFeedItem news={item} />
                                    </Animated.View>
                                )}
                                refreshing={loading}
                                onRefresh={() => {
                                    setNews([]);
                                    refetch({
                                        variables: { limit: 5, skip: 0 },
                                        onCompleted(data) {
                                            setNews(data.newsFeed);
                                            setPage(1);
                                        },
                                    });
                                }}
                                onEndReached={async () => {
                                    await refetch({
                                        variables: {
                                            limit: 5,
                                            skip: page * 5,
                                        },
                                        onCompleted(data) {
                                            setNews((prev) => [
                                                ...prev,
                                                ...data.newsFeed,
                                            ]);
                                        },
                                    });
                                    setPage(page + 1);
                                }}
                                showsVerticalScrollIndicator={true}
                                onEndReachedThreshold={10}
                                indicatorStyle="black"
                                contentContainerStyle={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 16,
                                }}
                            />
                        )}
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
}
