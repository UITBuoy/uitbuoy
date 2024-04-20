import { ScrollView, Text, View } from 'react-native';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import NewsFeedItem from '../../src/components/NewsFeedItem';
import { useGeneralNewsFeedQuery } from '../../src/gql/graphql';

export default function NewsFeedModal() {
    const { data, loading } = useGeneralNewsFeedQuery({
        variables: { limit: 7, skip: 0 },
    });

    return (
        <View
            style={{ backgroundColor: '#EFEFEF' }}
            className=" flex-1 bg-white"
        >
            <SafeAreaView style={{ flex: 1 }}>
                <Text className=" font-semibold text-xl mx-4">News</Text>
                <View className=" mt-4 flex-1">
                    <ScrollView className=" flex-1">
                        <View style={{ paddingVertical: 10 }}>
                            {loading ? (
                                <View></View>
                            ) : (
                                <View className=" flex flex-col gap-4">
                                    {data?.newsFeed.map((news, i) => (
                                        <Animated.View
                                            key={news.link}
                                            entering={FadeInUp.delay(
                                                i * 70 + 100,
                                            )}
                                            exiting={FadeOutUp}
                                        >
                                            <NewsFeedItem news={news} />
                                        </Animated.View>
                                    ))}
                                </View>
                            )}
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </View>
    );
}
