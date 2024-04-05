import { View, Text } from 'react-native';

import HAS_DEADLINE_ICON from '../../../assets/has-deadline-icon.png';
import REST_TIME_RIGHT from '../../../assets/rest-time-right.png';
import REST_TIME_LEFT from '../../../assets/rest-time-left.png';
import { Image } from 'expo-image';
import React from 'react';
import NativeButton from '../NativeButton/NativeButton';
import { CourseModuleEntity, EventEntity } from '../../gql/graphql';
import moment from 'moment';
import { router } from 'expo-router';

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
                    <Image
                        source={HAS_DEADLINE_ICON}
                        style={{
                            width: 70,
                            height: 40,
                            position: 'absolute',
                            right: 0,
                            top: '50%',
                            transform: [{ translateX: 10 }, { translateY: 0 }],
                        }}
                    />
                    <Text className=" text-neutral-30 font-semibold">
                        Exercises are due in{' '}
                        {moment(
                            new Date(mostRecentDeadline.assignDueDate * 1000),
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
    );
}
