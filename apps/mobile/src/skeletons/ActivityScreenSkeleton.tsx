import { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { randomRange } from '../utils/random';

export default function ActivityScreenSkeleton() {
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
        <View className=" flex flex-col">
            <Animated.View
                style={{ opacity, height: 70 }}
                className=" mx-4 bg-neutral-95 rounded-xl "
            />
            <Animated.View
                style={{ opacity, width: randomRange(100, 300), height: 30 }}
                className=" mt-10 mx-4 bg-neutral-95 rounded-xl "
            />
            <Animated.View
                style={{ opacity, height: 100 }}
                className=" mt-4 mx-4 bg-neutral-95 rounded-xl "
            />
            <View className=' mt-4'>
                {Array(randomRange(3, 6))
                .fill('')
                .map((_, index) => (
                    <Animated.View
                        key={index}
                        style={{ opacity, borderColor: '#CFCFCF' }}
                        className=" flex flex-col gap-4 py-4 px-6 border-[0.5px] "
                    >
                        <Animated.View
                            style={{ opacity, width: randomRange(100, 300) }}
                            className=" flex h-6 bg-neutral-90 rounded-lg"
                        ></Animated.View>
                        <Animated.View
                            style={{ opacity, width: randomRange(50, 200) }}
                            className=" flex h-6 bg-neutral-95 rounded-lg"
                        ></Animated.View>
                    </Animated.View>
                ))}
            </View>
        </View>
    );
}
