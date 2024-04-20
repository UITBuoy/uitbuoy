import React from 'react';
import { TextInput, View } from 'react-native';

type IProps = React.ComponentProps<typeof TextInput> & {
    title: string;
    type: 'none' | 'text' | 'password';
    placeholder?: string;
    className?: string;
    fieldClassName?: string;
    value?: string;
    onChangeText?: (value: string) => any;
};

const TextField = React.forwardRef(
    (
        {
            title,
            type,
            value,
            onChangeText,
            placeholder,
            className,
            fieldClassName,
            ...props
        }: IProps,
        ref: React.MutableRefObject<TextInput>,
    ) => {
        return (
            <View className={` w-full h-fit ${className}`}>
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    ref={ref}
                    secureTextEntry={type === 'password'}
                    className={fieldClassName}
                    placeholder={placeholder}
                    {...props}
                />
            </View>
        );
    },
);

TextField.displayName = 'TextField';

export default TextField;
