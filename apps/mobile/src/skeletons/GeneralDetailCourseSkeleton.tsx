import { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { randomRange } from '../utils/random';

export default function GeneralDetailCourseSkeleton() {
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
        <View className=" pt-6">
            <Animated.View
                style={{ opacity, borderColor: '#CFCFCF', height: 50 }}
                className=" mx-4 flex bg-neutral-95 rounded-xl"
            />
            <Animated.View
                style={{ opacity, borderColor: '#CFCFCF', width: 100 }}
                className=" mx-4 mt-10 h-6 bg-neutral-95 rounded-xl"
            />
            <View className=" mt-6">
                {Array(randomRange(5, 9))
                    .fill('')
                    .map((_, index) => (
                        <Animated.View
                            key={index}
                            style={{
                                opacity,
                                borderColor: '#CFCFCF',
                                height: 50,
                                marginVertical: 8,
                            }}
                            className=" mx-4 flex flex-row items-center border-[0.5px] rounded-xl"
                        >
                            <Animated.View
                                style={{
                                    opacity,
                                    borderColor: '#CFCFCF',
                                    width: randomRange(100, 300),
                                }}
                                className=" mx-4 h-6 bg-neutral-90 rounded-xl"
                            />
                        </Animated.View>
                    ))}
            </View>
        </View>
    );
}
