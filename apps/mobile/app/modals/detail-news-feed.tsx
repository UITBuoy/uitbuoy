import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
    Image,
    Linking,
    RefreshControl,
    ScrollView,
    Text,
    useWindowDimensions,
    View,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import NativeButton from '../../src/components/NativeButton/NativeButton';
import { useNewsFeedDetailQuery } from '../../src/gql/graphql';
import { timeDiff } from '../../src/utils/timeDiff';
import CHEVRON from '../../assets/arrow-left.png';

export default function DetailNewsFeedModal() {
    const { width } = useWindowDimensions();

    const { title: titleParam } = useLocalSearchParams();
    const { data, loading, refetch } = useNewsFeedDetailQuery({
        variables: { title: titleParam.toString() },
    });

    const { title, date, view, htmlContent, tags, files, imageUrl, link } =
        data?.newsFeedDetail || {};

    const { time, type } = timeDiff(new Date(date));

    return (
        <View style={{ backgroundColor: 'white' }} className=" flex-1 bg-white">
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={refetch} />
                }
            >
                {loading ? (
                    <></>
                ) : (
                    <View
                        style={{ paddingTop: 50 }}
                        className=" p-4 flex flex-col gap-4 items-start"
                    >
                        <NativeButton
                            onPress={() => {
                                router.back();
                            }}
                        >
                            <View className=" p-2 flex flex-row items-center gap-2">
                                <Image
                                    source={CHEVRON}
                                    style={{ width: 20, height: 20 }}
                                />
                                <Text className=" font-medium">Quay lại</Text>
                            </View>
                        </NativeButton>
                        <Text className=" mt-4 font-semibold text-2xl">
                            {title}
                        </Text>
                        <View className=" mt-4 flex flex-row gap-2">
                            <Text className=" px-3 py-1 rounded-lg bg-neutral-95 text-black text-center font-medium text-sm">{`${time} ${type} trước`}</Text>
                            <Text className=" px-3 py-1 rounded-lg bg-neutral-95 text-black text-center font-medium text-sm">{`${view} lượt xem`}</Text>
                        </View>
                        <View className=" mt-2 flex flex-col gap-2">
                            <Text className=" font-medium">Bài viết gốc</Text>
                            <View>
                                <NativeButton
                                    onPress={() => {
                                        Linking.openURL(link);
                                    }}
                                >
                                    <View
                                        style={{ borderColor: '#CFCFCF' }}
                                        className=" p-4 rounded-2xl flex flex-col gap-2 border-[0.5px]"
                                    >
                                        <Text className=" italic">{link}</Text>
                                    </View>
                                </NativeButton>
                            </View>
                        </View>
                        <View className=" flex-row gap-4">
                            {tags.map((tag) => (
                                <NativeButton key={tag.name} borderRadius={8}>
                                    <View className=" rounded-lg bg-primary-70 px-3 py-1">
                                        <Text className=" text-white text-center font-medium text-sm">
                                            {tag.name}
                                        </Text>
                                    </View>
                                </NativeButton>
                            ))}
                        </View>
                        <RenderHtml
                            contentWidth={width - 50}
                            baseStyle={{ marginTop: 8 }}
                            source={{
                                html: htmlContent.replace(
                                    /src="(.*?)"/g,
                                    `src="${link.split('/').slice(0, 3).join('/')}$1"`,
                                ),
                            }}
                            tagsStyles={{
                                img: { padding: 0, margin: 10 },
                                p: { padding: 0, marginVertical: 5 },
                            }}
                        />
                    </View>
                )}
            </ScrollView>
        </View>
    );
}
