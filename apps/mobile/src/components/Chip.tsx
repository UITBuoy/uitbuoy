import React from 'react';
import { Text, View } from 'react-native';

type Props = { textClassName?: string } & React.ComponentPropsWithoutRef<
    typeof View
>;

export default function Chip({
    children,
    className,
    textClassName,
    ...props
}: Props) {
    return (
        <View
            {...props}
            className={` w-fit rounded-lg px-2 py-1 bg-primary-70 ${className}`}
        >
            {typeof children === 'string' ? (
                <Text
                    className={`text-white font-semibold text-sm ${textClassName}`}
                >
                    {children}
                </Text>
            ) : (
                children
            )}
        </View>
    );
}
