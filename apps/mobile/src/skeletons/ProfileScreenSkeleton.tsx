import { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { randomRange } from '../utils/random';

export default function ProfileScreenSkeleton() {
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
        <View
            style={{ marginTop: 80 }}
            className=" mx-4 p-4 flex flex-col gap-4"
        >
            <Animated.View
                style={{ opacity, width: 100, height: 100 }}
                className=" rounded-2xl bg-neutral-95"
            />
            <View className=" flex flex-col gap-2">
                <Animated.View
                    style={{
                        opacity,
                        width: randomRange(100, 200),
                        height: 30,
                    }}
                    className=" bg-neutral-90 rounded-xl "
                />
                <Animated.View
                    style={{
                        opacity,
                        width: randomRange(150, 300),
                        height: 20,
                    }}
                    className=" bg-neutral-95 rounded-xl "
                />
            </View>
            <View className=" mt-4">
                <View className=" flex flex-col gap-2">
                    <Animated.View
                        style={{
                            opacity,
                            width: randomRange(150, 300),
                            height: 20,
                        }}
                        className=" bg-neutral-95 rounded-xl "
                    />
                    <Animated.View
                        style={{
                            opacity,
                            width: randomRange(150, 300),
                            height: 20,
                        }}
                        className=" bg-neutral-90 rounded-xl "
                    />
                </View>
            </View>
            <Animated.View
                style={{ opacity, width: randomRange(100, 300), height: 30 }}
                className=" mt-10 bg-neutral-95 rounded-xl "
            />
            <Animated.View
                style={{ opacity, height: 100 }}
                className=" mt-4 bg-neutral-95 rounded-xl "
            />
        </View>
    );
}
