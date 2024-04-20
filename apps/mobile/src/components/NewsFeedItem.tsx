import { Image, Text, View } from 'react-native';
import { NewsFeed } from '../gql/graphql';
import { timeDiff } from '../utils/timeDiff';
import NativeButton from './NativeButton/NativeButton';
import { router } from 'expo-router';

export default function NewsFeedItem({ news }: { news: NewsFeed }) {
    const { title, description, date, imageUrl, tags, view } = news;
    const { time, type } = timeDiff(new Date(date));

    return (
        <View className=" bg-white mx-4 rounded-2xl" style={{ elevation: 0 }}>
            <NativeButton
                onPress={() => {
                    router.push({
                        pathname: '/modals/detail-news-feed',
                        params: { title },
                    });
                }}
            >
                <View className=" bg-white p-4 px-4 flex flex-col items-start ">
                    <Text className=" font-bold flex flex-row items-center">
                        {title}
                    </Text>
                    <View className=" mt-4 flex flex-row gap-2">
                        <Text className=" px-3 py-1 rounded-lg bg-neutral-95 text-black text-center font-medium text-xs">{`${time} ${type} trước`}</Text>
                        <Text className=" px-3 py-1 rounded-lg bg-neutral-95 text-black text-center font-medium text-xs">{`${view} lượt xem`}</Text>
                    </View>
                    {imageUrl ? (
                        <Image
                            source={{ uri: imageUrl }}
                            style={{
                                width: '100%',
                                height: 200,
                                objectFit: 'cover',
                            }}
                            className=" mt-4 rounded-2xl"
                        />
                    ) : null}
                    {description ? (
                        <Text className=" mt-4 text-neutral-40">
                            {description}
                        </Text>
                    ) : null}
                </View>
            </NativeButton>
            <View className=" flex-row p-2 gap-4">
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
        </View>
    );
}
