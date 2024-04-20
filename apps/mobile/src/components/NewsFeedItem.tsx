import { Image, Text, View } from 'react-native';
import { NewsFeed } from '../gql/graphql';
import { timeDiff } from '../utils/timeDiff';
import NativeButton from './NativeButton/NativeButton';

export default function NewsFeedItem({
    news: { title, description, date, imageUrl, tags },
}: {
    news: NewsFeed;
}) {
    const { time, type } = timeDiff(new Date(date));

    return (
        <View className=" bg-white mx-4 rounded-2xl">
            <NativeButton>
                <View className=" bg-white p-4 px-4 flex flex-col items-start ">
                    <Text className=" font-semibold">{title}</Text>
                    <Text className=" mt-2 px-3 py-1 rounded-lg bg-neutral-95 text-black text-center font-medium text-sm">{`${time} ${type} trước`}</Text>
                    {description ? (
                        <Text className=" mt-4 text-neutral-40">
                            {description}
                        </Text>
                    ) : null}
                    {imageUrl ? (
                        <Image
                            source={{ uri: imageUrl }}
                            style={{ width: 200, height: 200 }}
                        />
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
