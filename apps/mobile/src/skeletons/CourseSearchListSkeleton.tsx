import { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { randomRange } from '../utils/random';

export default function CourseSearchListSkeleton() {
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

    return Array(randomRange(3, 6))
        .fill('')
        .map((_, index) => (
            <View key={index} className=" px-5 py-4 flex flex-row gap-4">
                <Animated.View
                    style={{ opacity }}
                    className=" flex w-6 h-6 bg-neutral-90 rounded-lg"
                />
                <Animated.View
                    style={{ opacity }}
                    className=" flex flex-col gap-4"
                >
                    <Animated.View
                        style={{ opacity, width: randomRange(100, 300) }}
                        className=" flex h-6 bg-neutral-90 rounded-lg"
                    />
                    <Animated.View
                        style={{ opacity, width: randomRange(50, 200) }}
                        className=" flex h-6 bg-neutral-95 rounded-lg"
                    />
                </Animated.View>
            </View>
        ));
}
