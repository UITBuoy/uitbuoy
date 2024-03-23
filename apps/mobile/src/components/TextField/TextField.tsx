import React from 'react';
import {
    Box,
    FormControl,
    FormControlLabel,
    FormControlLabelText,
    Input,
    InputField,
    FormControlHelper,
    FormControlHelperText,
    FormControlError,
    FormControlErrorIcon,
    AlertCircleIcon,
    FormControlErrorText,
} from '@gluestack-ui/themed';

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
        <Box className=" w-full h-fit mt-3 pt-3">
            <FormControl
                size="md"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
                isRequired={false}
            >
                <FormControlLabel mt="$6">
                    <FormControlLabelText>{title}</FormControlLabelText>
                </FormControlLabel>
                <Input>
                    <InputField type={type} placeholder={placeholder} />
                </Input>
                {/* <FormControlHelper>
                    <FormControlHelperText>
                        Must be at least 6 characters.
                    </FormControlHelperText>
                </FormControlHelper>
                <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                        At least 6 characters are required.
                    </FormControlErrorText>
                </FormControlError> */}
            </FormControl>
        </Box>
    );
}
