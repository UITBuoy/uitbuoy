import { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { randomRange } from '../utils/random';

export default function ActivitiesDetailCourseSkeleton() {
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
        <View className=" flex flex-col gap-4">
            <Animated.View
                style={{ opacity, borderColor: '#CFCFCF', width: 100 }}
                className=" mx-4 mt-4 h-6 bg-neutral-90 rounded-xl"
            />
            <View className=" mt-6 flex-col gap-4">
                {Array(randomRange(1, 4))
                    .fill('')
                    .map((_, index) => (
                        <Animated.View
                            key={index}
                            style={{ opacity, borderColor: '#CFCFCF' }}
                            className=" p-6 px-4 mx-4 flex flex-row gap-3 items-start border-[0.5px] rounded-2xl"
                        >
                            <Animated.View
                                style={{
                                    opacity,
                                    borderColor: '#CFCFCF',
                                }}
                                className=" w-10 h-10 bg-neutral-90 rounded-xl"
                            />
                            <Animated.View
                                style={{
                                    opacity,
                                    borderColor: '#CFCFCF',
                                    width: randomRange(100, 300),
                                }}
                                className=" flex-col gap-3 bg-neutral-99 rounded-xl"
                            >
                                <Animated.View
                                    style={{
                                        opacity,
                                        borderColor: '#CFCFCF',
                                        width: randomRange(100, 300),
                                    }}
                                    className=" h-6 bg-neutral-90 rounded-xl"
                                />
                                <Animated.View
                                    style={{
                                        opacity,
                                        borderColor: '#CFCFCF',
                                        width: randomRange(100, 300),
                                    }}
                                    className=" h-5 bg-neutral-95 rounded-xl"
                                />
                            </Animated.View>
                        </Animated.View>
                    ))}
            </View>
            <Animated.View
                style={{ opacity, borderColor: '#CFCFCF', width: 100 }}
                className=" mx-4 mt-4 h-6 bg-neutral-90 rounded-xl"
            />
            <View className=" mt-6 flex-col gap-4">
                {Array(randomRange(1, 4))
                    .fill('')
                    .map((_, index) => (
                        <Animated.View
                            key={index}
                            style={{ opacity, borderColor: '#CFCFCF' }}
                            className=" p-6 px-4 mx-4 flex flex-row gap-3 items-start border-[0.5px] rounded-2xl"
                        >
                            <Animated.View
                                style={{
                                    opacity,
                                    borderColor: '#CFCFCF',
                                }}
                                className=" w-10 h-10 bg-neutral-90 rounded-xl"
                            />
                            <Animated.View
                                style={{
                                    opacity,
                                    borderColor: '#CFCFCF',
                                    width: randomRange(100, 300),
                                }}
                                className=" flex-col gap-3 bg-neutral-99 rounded-xl"
                            >
                                <Animated.View
                                    style={{
                                        opacity,
                                        borderColor: '#CFCFCF',
                                        width: randomRange(100, 300),
                                    }}
                                    className=" h-6 bg-neutral-90 rounded-xl"
                                />
                                <Animated.View
                                    style={{
                                        opacity,
                                        borderColor: '#CFCFCF',
                                        width: randomRange(100, 300),
                                    }}
                                    className=" h-5 bg-neutral-95 rounded-xl"
                                />
                            </Animated.View>
                        </Animated.View>
                    ))}
            </View>
        </View>
    );
}
