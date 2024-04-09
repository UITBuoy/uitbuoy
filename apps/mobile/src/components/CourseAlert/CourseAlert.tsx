import { Text, View } from 'react-native';

import { Image } from 'expo-image';
import { router } from 'expo-router';
import moment from 'moment';
import React from 'react';
import Animated, {
    FadeInDown,
    FadeInRight,
    FadeOutRight,
    FadeOutUp,
    FlipInEasyX,
    FlipOutEasyX,
} from 'react-native-reanimated';
import HAS_DEADLINE_ICON from '../../../assets/has-deadline-icon.png';
import REST_TIME_LEFT from '../../../assets/rest-time-left.png';
import REST_TIME_RIGHT from '../../../assets/rest-time-right.png';
import { CourseModuleEntity } from '../../gql/graphql';
import NativeButton from '../NativeButton/NativeButton';

type Props = React.ComponentProps<typeof View> & {
    hasDeadline: boolean;
    mostRecentDeadline: Partial<CourseModuleEntity>;
    courseId: number;
};

export default function CourseAlert({
    hasDeadline,
    mostRecentDeadline,
    courseId,
    className,
}: Props) {
    return (
        <Animated.View entering={FlipInEasyX} exiting={FlipOutEasyX}>
            <NativeButton
                className={`rounded-xl flex justify-center items-center ${className}`}
                onPress={() => {
                    if (!hasDeadline) return;
                    router.push({
                        pathname: '/modals/detail-activity',
                        params: {
                            id: mostRecentDeadline.id,
                            assignment_id: mostRecentDeadline.id,
                            course_id: courseId,
                        },
                    });
                }}
            >
                {hasDeadline ? (
                    <View
                        style={{
                            flex: 1,
                            width: '100%',
                            padding: 20,
                            backgroundColor: '#FE505033',
                        }}
                    >
                        <Animated.View
                            entering={FadeInRight}
                            exiting={FadeOutRight}
                        >
                            <Image
                                source={HAS_DEADLINE_ICON}
                                style={{
                                    width: 70,
                                    height: 40,
                                    position: 'absolute',
                                    right: 0,
                                    top: 0,
                                    transform: [
                                        { translateX: 30 },
                                        { translateY: -10 },
                                    ],
                                }}
                            />
                        </Animated.View>
                        <Text className=" text-neutral-30 font-semibold">
                            Exercises are due in{' '}
                            {moment(
                                new Date(
                                    mostRecentDeadline.assignDueDate * 1000,
                                ),
                            ).diff(moment(new Date()), 'days')}{' '}
                            days
                        </Text>
                    </View>
                ) : (
                    <View
                        style={{
                            width: '100%',
                            height: 'auto',
                            padding: 20,
                            backgroundColor: '#44E18733',
                        }}
                    >
                        <Image
                            source={REST_TIME_LEFT}
                            style={{
                                width: 60,
                                height: 60,
                                position: 'absolute',
                                left: -10,
                                top: 15,
                            }}
                        />
                        <Image
                            source={REST_TIME_RIGHT}
                            style={{
                                width: 40,
                                height: 40,
                                position: 'absolute',
                                right: -10,
                                top: 5,
                            }}
                        />
                        <Text className=" text-center text-neutral-30 font-semibold">
                            Rest time
                        </Text>
                    </View>
                )}
            </NativeButton>
        </Animated.View>
    );
}
