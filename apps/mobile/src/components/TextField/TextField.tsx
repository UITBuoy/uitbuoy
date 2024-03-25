import React from 'react';
import { TextInput, View } from 'react-native';
// import {
//     Box,
//     FormControl,
//     FormControlLabel,
//     FormControlLabelText,
//     Input,
//     InputField,
// } from '@gluestack-ui/themed';

type IProps = {
    title: string;
    type: 'text' | 'password';
    placeholder?: string;
    className?: string;
    value?: string;
    onChangeText?: (value: string) => any;
};

const TextField = React.forwardRef(
    (
        { title, type, value, onChangeText, placeholder, className }: IProps,
        ref: React.MutableRefObject<TextInput>,
    ) => {
        return (
            <View
                className={` w-full border-[1px] rounded-full h-fit py-2 px-4 ${className}`}
            >
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    ref={ref}
                    className=""
                    placeholder={placeholder}
                />
            </View>
        );
    },
);

TextField.displayName = 'TextField';

export default TextField;
