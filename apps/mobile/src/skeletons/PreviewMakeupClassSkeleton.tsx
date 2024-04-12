import { Animated, View } from 'react-native';
import { randomRange } from '../utils/random';
import { useEffect, useRef } from 'react';

export default function PreviewMakeupClassSkeleton() {
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
            style={{ opacity }}
            className=" flex flex-col gap-4 py-4 px-6 "
        >
            <View className=" flex-row items-center gap-4">
                <Animated.View
                    style={{ opacity, width: 100, height: 30 }}
                    className=" flex bg-neutral-90 rounded-lg"
                ></Animated.View>
                <Animated.View
                    style={{ opacity, width: 120, height: 24 }}
                    className=" flex bg-neutral-95 rounded-lg"
                ></Animated.View>
            </View>
            <Animated.View
                style={{ opacity, height: 50 }}
                className=" flex bg-neutral-90 rounded-lg"
            ></Animated.View>
            <View className=" flex-row items-center gap-4">
                <Animated.View
                    style={{ opacity, width: 120, height: 24 }}
                    className=" flex bg-neutral-95 rounded-lg"
                ></Animated.View>
                <Animated.View
                    style={{ opacity, width: 120, height: 24 }}
                    className=" flex bg-neutral-95 rounded-lg"
                ></Animated.View>
            </View>
        </Animated.View>
    );
}
