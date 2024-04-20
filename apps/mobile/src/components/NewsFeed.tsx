import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NewsFeed, useGeneralNewsFeedLazyQuery } from '../gql/graphql';
import NewsFeedItem from './NewsFeedItem';

export default function NewsFeedComponent({ tagName }: { tagName?: string }) {
    const [page, setPage] = useState(0);
    const [news, setNews] = useState<NewsFeed[]>([]);

    const [refetch, { data, loading }] = useGeneralNewsFeedLazyQuery();

    useEffect(() => {
        refetch({
            variables: {
                limit: 5,
                skip: 0,
                tags: tagName ? [tagName] : undefined,
            },
            onCompleted(data) {
                setNews(data.newsFeed);
                setPage(1);
            },
        });
    }, []);

    return (
        <View className=" flex-1" style={{ backgroundColor: '#EFEFEF' }}>
            <View className=" flex-1">
                <View className=" flex-1" style={{ paddingVertical: 10 }}>
                    {loading && news.length === 0 ? (
                        <View></View>
                    ) : (
                        <FlatList
                            data={news}
                            keyExtractor={(item) => item.title}
                            renderItem={({ item, index }) => (
                                <Animated.View
                                    entering={FadeInUp.delay(index * 70 + 100)}
                                    exiting={FadeOutUp}
                                >
                                    <NewsFeedItem news={item} />
                                </Animated.View>
                            )}
                            refreshing={loading}
                            onRefresh={() => {
                                setNews([]);
                                refetch({
                                    variables: {
                                        limit: 5,
                                        skip: 0,
                                        tags: tagName ? [tagName] : undefined,
                                    },
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
                                        tags: tagName ? [tagName] : undefined,
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
                            onEndReachedThreshold={1}
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
        </View>
    );
}
