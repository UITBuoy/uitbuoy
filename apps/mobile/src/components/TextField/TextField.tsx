import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { Box } from '../ui/Box/Box';
import {
    FormControl,
    FormControlLabel,
    FormControlLabelText,
} from '../ui/FormControl/FormControl';
import { Input, InputField } from '../ui/Input/Input';
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
};

export default function TextField({
    title,
    type,
    placeholder,
    className,
}: IProps) {
    return (
        <View
            className={` w-full border-[1px] rounded-full h-fit py-2 px-4 ${className}`}
        >
            <TextInput className="" placeholder={placeholder} />
        </View>
    );
}
