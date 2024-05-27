import React from 'react';
import { Image, ImageSourcePropType, Text, View } from 'react-native';
import NativeButton from './NativeButton/NativeButton';

type TProps = React.ComponentProps<typeof View> & {
    icon: ImageSourcePropType;
    title: string;
    subTitle: string;
    onPress?: () => any;
};

export default function HeaderButton({
    icon,
    title,
    subTitle,
    onPress = () => {},
    className,
    ...props
}: TProps) {
    return (
        <View
            {...props}
            className={`px-2 mt-10 mb-2 flex-col items-start ${className}`}
        >
            <NativeButton onPress={onPress}>
                <View className=" p-2">
                    <View className=" flex flex-row items-end gap-2">
                        <Image
                            source={icon}
                            style={{
                                width: 20,
                                height: 20,
                            }}
                        />
                        <Text className=" text-lg font-semibold">{title}</Text>
                    </View>
                    <Text
                        style={{ marginLeft: 28 }}
                        className=" mt-1 text-sm text-neutral-30"
                    >
                        {subTitle}
                    </Text>
                </View>
            </NativeButton>
        </View>
    );
}
