import React from 'react';
import Animated, {
    SharedValue,
    useAnimatedStyle,
} from 'react-native-reanimated';
import ChevronIcon from '../../icons/chevron';

type Props = {
    progress: Readonly<SharedValue<0 | 1>>;
};

const Chevron = ({ progress }: Props) => {
    const iconStyle = useAnimatedStyle(() => ({
        //@ts-ignore
        transform: [{ rotate: `${progress.value * -180}deg` }, { scale: 1.5 }],
    }));

    return (
        <Animated.View style={iconStyle}>
            <ChevronIcon />
        </Animated.View>
    );
};

export default Chevron;
