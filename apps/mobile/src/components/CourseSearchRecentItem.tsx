import { Image, Text, TouchableNativeFeedback, View } from 'react-native';
import RECENT_SEARCH_ICON from '../../assets/recent-search.png';

export default function CourseSearchRecentItem({
    text,
    onPress,
}: { text: string } & {
    onPress?: () => any;
}) {
    return (
        <TouchableNativeFeedback onPress={() => onPress?.()}>
            <View className=" px-5 py-2 flex flex-row items-center gap-4">
                <Image
                    source={RECENT_SEARCH_ICON}
                    style={{ width: 20, height: 20 }}
                />
                <Text
                    style={{ color: '#B4B4B4' }}
                    className=" text-lg font-medium"
                >
                    {text}
                </Text>
            </View>
        </TouchableNativeFeedback>
    );
}
