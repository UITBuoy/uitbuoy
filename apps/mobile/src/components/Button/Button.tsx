import React from 'react';

import { Button as _Button, ButtonText } from '@gluestack-ui/themed';
import { View, TouchableOpacity, Text } from 'react-native';

export default function Button({ children, className }: IProp) {
    return (
        // <_Button
        //     className=" bg-red-500 w-full"
        //     size="md"
        //     variant="solid"
        //     action="primary"
        //     isDisabled={false}
        //     isFocusVisible={false}
        // >
        //     <ButtonText>{children}</ButtonText>
        // </_Button>
        <TouchableOpacity>
            <View className=" bg-sky-500 rounded-lg flex mt-5 mx-5 p-3 items-center justify-center">
                <Text className=" w-fit font-medium text-base text-white">
                    {children}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

type IProp = {
    className: string;
    children: React.ReactNode;
};
