import { Image, View, Text } from 'react-native';
import NativeButton from './NativeButton/NativeButton';

export default function ProfileButton({
    source,
    title,
    onPress = () => {},
}: {
    source: any;
    title: string;
    onPress?: () => any;
}) {
    return (
        <View className=" mx-4 ">
            <NativeButton className="" onPress={onPress}>
                <View className="p-3 rounded-xl flex flex-row items-center gap-4">
                    <Image style={{ width: 35, height: 35 }} source={source} />
                    <Text className=" text-lg font-medium">{title}</Text>
                </View>
            </NativeButton>
        </View>
    );
}
