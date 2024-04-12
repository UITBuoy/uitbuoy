import { Image, Text, TouchableOpacity, View } from 'react-native';

export default function LargeIllustrationSelector({
    source,
    title,
    description,
    isSelected,
    onPress = () => {},
}: {
    source: any;
    title: string;
    description: string;
    isSelected: boolean;
    onPress?: () => any;
}) {
    return (
        <View className="" style={{ flexGrow: 1, flex: 1 }}>
            <TouchableOpacity onPress={onPress}>
                <View
                    style={{
                        borderWidth: 3,
                        borderRadius: 14,
                        height: 280,
                        borderColor: isSelected ? '#3EAEFF' : '#F2F2F2',
                        opacity: isSelected ? 1 : 0.3,
                    }}
                    className=" p-4 flex-col items-center gap-2"
                >
                    <Image
                        source={source}
                        style={{ width: 100, height: 120 }}
                    />
                    <Text className=" text-lg font-semibold mt-2">{title}</Text>
                    <Text className=" text-sm font-light text-center">
                        {description}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
