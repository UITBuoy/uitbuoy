import { DeepPartial } from '@apollo/client/utilities';
import React from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableNativeFeedback,
    useWindowDimensions,
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
import { Section } from '../../gql/graphql';
import { useDetailFolderRouter } from '../../stores/folder-detail.store';
import Chevron from './Chevron';
import NativeButton from '../NativeButton/NativeButton';
import { capitalizeFirstLetter } from '../../utils/stringTransfrom';
import Chip from '../Chip';
import SubjectItem from '../SubjectItem';

type Props = {
    section: DeepPartial<Section>;
};

const KnowledgeBlockAccordion = ({ section }: Props) => {
    const { navigateFolder } = useDetailFolderRouter();

    const { width } = useWindowDimensions();

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
        <View
            className=" border-neutral-70 border-[0.5px] rounded-xl overflow-hidden"
            style={{
                marginBottom: 8,
                borderLeftWidth: 7,
                borderLeftColor: '#3FB7E6',
                // borderTopWidth: 7,
                // borderTopColor: '#3FB7E6',
                borderTopColor: '#CFCFCF',
                borderRightColor: '#CFCFCF',
                // borderLeftColor: '#CFCFCF',
                borderBottomColor: '#CFCFCF',
            }}
        >
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
                <View className=" p-2 flex-row justify-between items-center">
                    <View className=" flex-1">
                        <Text className=" text-lg font-medium">
                            {capitalizeFirstLetter(section.name)}
                        </Text>
                        <View className=" mt-2 flex-row gap-2">
                            <Chip>{`${section.totalCredit || 0} tín chỉ`}</Chip>
                            <Chip
                                style={{ backgroundColor: '#44E187' }}
                            >{`${section.subjects.length || 0} môn học`}</Chip>
                        </View>
                        <Text className=" mt-4 font-medium">Đã học</Text>
                        <View className="mt-2 flex-1 flex-row items-center gap-2">
                            <Text className=" font-medium">{`${section.learnedCredit}/${section.totalCredit}`}</Text>
                            <View
                                className=" flex-1 rounded-2xl"
                                style={{
                                    backgroundColor: '#E6E6E6',
                                    height: 8,
                                    overflow: 'hidden',
                                }}
                            >
                                <View
                                    style={{
                                        width: `${(section.learnedCredit / section.totalCredit) * 100}%`,
                                        backgroundColor: '#3FB7E6',
                                        height: 10,
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                    <Chevron progress={progress} />
                </View>
            </TouchableNativeFeedback>
            <Animated.View style={heightAnimationStyle}>
                <Animated.View style={styles.contentContainer} ref={listRef}>
                    <FlatList
                        data={[...section.subjects].sort(
                            (a, b) =>
                                (a.isLearned ? 1 : 0) - (b.isLearned ? 1 : 0),
                        )}
                        renderItem={({ item }) => (
                            <SubjectItem subject={item} />
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </Animated.View>
            </Animated.View>
        </View>
    );
};

export default KnowledgeBlockAccordion;

const styles = StyleSheet.create({
    contentContainer: {
        position: 'absolute',
        width: '100%',
        top: 0,
        paddingBottom: 30,
    },
});
