import { Image, Text, TouchableOpacity, View } from 'react-native';

export default function HorizontalIllustrationSelector({
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
                        height: 130,
                        flex: 1,
                        borderColor: isSelected ? '#3EAEFF' : '#F2F2F2',
                        opacity: isSelected ? 1 : 0.3,
                    }}
                    className=" p-4 flex-row items-center gap-4"
                >
                    <Image
                        source={source}
                        style={{ width: 100, height: 120 }}
                    />
                    <View className=" flex-1 flex-col gap-1">
                        <Text className=" text-lg font-semibold mt-2">
                            {title}
                        </Text>
                        <Text className=" text-sm font-light">
                            {description}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}
