import React, { ReactNode } from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    TouchableNativeFeedback,
    View,
} from 'react-native';
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
import ResourceIcon from '../../icons/resource';
import FolderIcon from '../../icons/folder';
import ForumIcon from '../../icons/forum';
import AssignIcon from '../../icons/assign';

type Props = {
    value: {
        name: string;
        contents: { modname: string; name: string }[];
    };
};

const CourseContentAccordion = ({ value }: Props) => {
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
        <View className=" border-primary-60 border-[0.5px] rounded-2xl overflow-hidden">
            <TouchableNativeFeedback
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
            >
                <View style={styles.titleContainer}>
                    <Text className=" font-semibold text-lg">{value.name}</Text>
                    <Chevron progress={progress} />
                </View>
            </TouchableNativeFeedback>
            <Animated.View style={heightAnimationStyle}>
                <Animated.View style={styles.contentContainer} ref={listRef}>
                    {value.contents.map(({ name, modname }, i) => {
                        return (
                            <TouchableNativeFeedback key={i}>
                                <View className=" w-full flex flex-row gap-4 items-center px-3 py-4 border-t-[0.2px] border-t-neutral-60">
                                    {modname === 'resouce' ? (
                                        <ResourceIcon />
                                    ) : modname === 'folder' ? (
                                        <FolderIcon />
                                    ) : modname === 'forum' ? (
                                        <ForumIcon />
                                    ) : modname === 'assign' ? (
                                        <AssignIcon />
                                    ) : (
                                        <></>
                                    )}
                                    <View className="flex-1">
                                        <Text className=" font-medium">
                                            {name}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableNativeFeedback>
                        );
                    })}
                </Animated.View>
            </Animated.View>
        </View>
    );
};

export default CourseContentAccordion;

const styles = StyleSheet.create({
    titleContainer: {
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    contentContainer: {
        position: 'absolute',
        width: '100%',
        top: 0,
    },
});
