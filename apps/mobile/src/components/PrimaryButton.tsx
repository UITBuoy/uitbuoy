import React, { ReactNode } from 'react';
import { View } from 'react-native';
import NativeButton from './NativeButton/NativeButton';

export default function PrimaryButton({
    children,
    ...props
}: { children?: ReactNode } & React.ComponentPropsWithoutRef<
    typeof NativeButton
>) {
    return (
        <View className=" flex-row">
            <NativeButton {...props}>
                <View className=" px-4 py-2 bg-primary-70 flex-row justify-between">
                    {children}
                </View>
            </NativeButton>
        </View>
    );
}
