import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
// import { Category } from '../data/data';
import Animated, {
    measure,
    runOnUI,
    useAnimatedRef,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import Chevron from './Chevron';

type Props = {
    value: {
        title: string;
        contents: string[];
    };
};

const Accordion = ({ value }: Props) => {
    const listRef = useAnimatedRef();
    const heightValue = useSharedValue(0);
    const open = useSharedValue(false);
    const progress = useDerivedValue(() =>
        open.value ? withTiming(1) : withTiming(0),
    );

    const heightAnimationStyle = useAnimatedStyle(() => ({
        height: heightValue.value,
    }));

    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => {
                    if (heightValue.value === 0) {
                        runOnUI(() => {
                            'worklet';
                            heightValue.value = withTiming(
                                measure(listRef)!.height,
                            );
                        })();
                    } else {
                        heightValue.value = withTiming(0);
                    }
                    open.value = !open.value;
                }}
                style={styles.titleContainer}
            >
                <Text style={styles.textTitle}>{value.title}</Text>
                <Chevron progress={progress} />
            </Pressable>
            <Animated.View style={heightAnimationStyle}>
                <Animated.View style={styles.contentContainer} ref={listRef}>
                    {/* {type === 'regular' && */}
                    {value.contents.map((v, i) => {
                        return (
                            <View key={i} style={styles.content}>
                                <Text style={styles.textContent}>{v}</Text>
                            </View>
                        );
                    })}
                    {/* {type === 'nested' && (
                        <>
                            <View style={styles.content}>
                                <Text style={styles.textContent}>
                                    {value.content}
                                </Text>
                            </View>
                            {value.nestedContents.map((val, ind) => {
                                return (
                                    <AccordionNested
                                        value={val}
                                        key={ind}
                                        parentHeighValue={heightValue}
                                    />
                                );
                            })}
                        </>
                    )} */}
                </Animated.View>
            </Animated.View>
        </View>
    );
};

export default Accordion;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E3EDFB',
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#0F56B3',
        overflow: 'hidden',
    },
    textTitle: {
        fontSize: 16,
        color: 'black',
    },
    titleContainer: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    contentContainer: {
        position: 'absolute',
        width: '100%',
        top: 0,
    },
    content: {
        padding: 20,
        backgroundColor: '#D6E1F0',
    },
    textContent: {
        fontSize: 14,
        color: 'black',
    },
});
