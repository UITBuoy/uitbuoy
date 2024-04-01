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
        transform: [{ rotate: `${progress.value * -180}deg` }],
    }));

    return (
        <Animated.View style={iconStyle}>
            <ChevronIcon />
        </Animated.View>
    );
};

export default Chevron;
