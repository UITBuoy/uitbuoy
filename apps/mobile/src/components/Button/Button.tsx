import React from 'react';

import { Button as _Button, ButtonText } from '@gluestack-ui/themed';

export default function Button({ children }: IProp) {
    return (
        <_Button
            size="md"
            variant="solid"
            action="primary"
            isDisabled={false}
            isFocusVisible={false}
        >
            <ButtonText>{children}</ButtonText>
        </_Button>
    );
}

type IProp = {
    children: React.ReactNode;
};
