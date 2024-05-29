import React from 'react';
import { Text, View } from 'react-native';

type Props = {} & React.ComponentPropsWithoutRef<typeof View>;

export default function Chip({ children, className, ...props }: Props) {
    return (
        <View
            {...props}
            className={` w-fit rounded-lg px-2 py-1 bg-primary-70 ${className}`}
        >
            <Text className=" text-white font-semibold text-sm">
                {children}
            </Text>
        </View>
    );
}
