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
import { Section, SemesterProgram, useProfileQuery } from '../../gql/graphql';
import { useDetailFolderRouter } from '../../stores/folder-detail.store';
import { capitalizeFirstLetter } from '../../utils/stringTransfrom';
import Chip from '../Chip';
import SubjectItem from '../SubjectItem';
import Chevron from './Chevron';
import { useSubjectSelection } from '../../stores/subject-selection.store';
import SelectionSubjectItem from '../SelectionSubjectItem';
import SemesterSubjectItem from '../SemesterSubjectItem';

type Props = {
    program: DeepPartial<SemesterProgram>;
};

const SemesterProgramAccordion = ({ program }: Props) => {
    const listRef = useAnimatedRef();
    const heightValue = useSharedValue(0);
    const open = useSharedValue(false);
    const progress = useDerivedValue(() =>
        open.value ? withTiming(1) : withTiming(0),
    );

    const heightAnimationStyle = useAnimatedStyle(() => ({
        height: heightValue.value,
    }));

    const { data } = useProfileQuery();

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
                            {`Học kỳ ${(data?.profile.semester || 0) + program.index + 1}`}
                        </Text>
                    </View>
                    <Chevron progress={progress} />
                </View>
            </TouchableNativeFeedback>
            <Animated.View style={heightAnimationStyle}>
                <Animated.View style={styles.contentContainer} ref={listRef}>
                    <FlatList
                        data={program.subjects}
                        renderItem={({ item }) => (
                            <SemesterSubjectItem subject={item} />
                        )}
                        keyExtractor={(item) => item.code}
                    />
                </Animated.View>
            </Animated.View>
        </View>
    );
};

export default SemesterProgramAccordion;

const styles = StyleSheet.create({
    contentContainer: {
        position: 'absolute',
        width: '100%',
        top: 0,
        paddingBottom: 30,
    },
});
