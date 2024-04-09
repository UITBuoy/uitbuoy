import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export default function DeadlineSkeleton() {
    const opacityValue = useRef(new Animated.Value(0)).current;

    const opacity = opacityValue.interpolate({
        inputRange: [0, 0.2, 0.5, 0.8, 1],
        outputRange: [0.2, 0.8, 1, 0.8, 0.2],
    });

    useEffect(() => {
        Animated.loop(
            Animated.timing(opacityValue, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            }),
        ).start();
    }, []);

    return (
        <Animated.View
            style={{ opacity, width: 40, height: 40 }}
            className=" w-10 h-10 bg-neutral-95 rounded-xl "
        />
    );
}
