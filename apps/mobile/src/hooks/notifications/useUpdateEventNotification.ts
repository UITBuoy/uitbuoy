import { DeepPartial } from '@apollo/client/utilities';
import notifee, {
    AndroidLaunchActivityFlag,
    AndroidStyle,
    EventType,
    TimestampTrigger,
    TriggerType,
} from '@notifee/react-native';
import { router } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { EventEntity } from '../../gql/graphql';
import { useNotificationConfig } from '../../stores/notification-config';
import { useSentEvents } from '../../stores/sentEvents.store';
import { timeDiff } from '../../utils/timeDiff';

export function useUpdateEventNotification(
    events?: DeepPartial<EventEntity>[],
) {
    const { eventIds, addEventIds, removeAll } = useSentEvents();

    const {
        isDimissible,
        isVibration,
        isNotifyAtTheBeginingOfDay,
        timeBefore,
    } = useNotificationConfig();

    const updateNotification = useCallback(
        async (event: DeepPartial<EventEntity>) => {
            addEventIds([event.id.toString()]);

            const channelId = await notifee.createChannel({
                id: 'assignment_due',
                name: 'Thông báo hạn nộp bài tập',
                ...(isVibration
                    ? {
                          vibration: true,
                          vibrationPattern: [300, 500],
                      }
                    : {}),
            });

            const timestamp = event.timestart * 1000 - timeBefore * 86_400_000;

            const trigger: TimestampTrigger = {
                type: TriggerType.TIMESTAMP,
                timestamp:
                    timestamp < new Date().getTime() &&
                    event.timestart * 1000 > new Date().getTime()
                        ? new Date().getTime() + 2000
                        : timestamp,
            };

            const { time, type } = timeDiff(new Date(event.timestart * 1000));

            await notifee.createTriggerNotification(
                {
                    id: event.id.toString(),
                    title: event.name,
                    body: `Còn <b>${-time} ${type}</b> nữa sẽ đến hạn nộp bài tâp<br /> `,
                    data: {
                        id: event.id,
                        instance: event.instance,
                        courseId: event.course.id,
                    },
                    android: {
                        autoCancel: false,
                        channelId,
                        ongoing: !isDimissible,
                        style: {
                            type: AndroidStyle.BIGTEXT,
                            text: `<p>Bài tập <b>${event.activityname}</b> sẽ hết hạn vào lúc <b>
                            ${new Intl.DateTimeFormat('vi-VN', {
                                dateStyle: 'full',
                                timeStyle: 'medium',
                                timeZone: 'Asia/Ho_Chi_Minh',
                            }).format(
                                new Date(event.timestart * 1000),
                            )}</b></p>`,
                        },
                        pressAction: { id: 'default' },
                        actions: [
                            {
                                title: 'Xem bài tập',
                                pressAction: {
                                    id: 'default',
                                },
                            },
                        ],
                    },
                },
                trigger,
            );
        },
        [],
    );

    useEffect(() => {
        return notifee.onForegroundEvent(({ type, detail }) => {
            switch (type) {
                case EventType.DISMISSED:
                    console.log(
                        'User dismissed notification',
                        detail.notification,
                    );
                    break;
                case EventType.PRESS:
                    const event = detail.notification.data;
                    router.push({
                        pathname: '/modals/detail-activity',
                        params: {
                            id: event.id,
                            assignment_id: event.instance,
                            course_id: event.courseId,
                        },
                    });
                    break;
            }
        });
    }, []);

    useEffect(() => {
        return notifee.onBackgroundEvent(async ({ type, detail }) => {
            switch (type) {
                case EventType.DISMISSED:
                    console.log(
                        'User dismissed notification',
                        detail.notification,
                    );
                    break;
                case EventType.PRESS:
                    const event = detail.notification.data;
                    router.push({
                        pathname: '/modals/detail-activity',
                        params: {
                            id: event.id,
                            assignment_id: event.instance,
                            course_id: event.courseId,
                        },
                    });
                    break;
            }
        });
    }, []);

    useEffect(() => {
        (async () => {
            const notifications = await notifee.getDisplayedNotifications();

            if (events) {
                events
                    .reverse()
                    .filter((event) =>
                        notifications.every(
                            (noti) => noti.id !== event.id.toString(),
                        ),
                    )
                    .forEach((event) => {
                        if (eventIds.every((id) => id !== event.id.toString()))
                            updateNotification(event);
                    });
            }
        })();
    }, [JSON.stringify(events || [])]);

    useEffect(() => {
        (async () => {
            if (events) {
                events.reverse().forEach((event) => {
                    if (eventIds.every((id) => id !== event.id.toString()))
                        updateNotification(event);
                });
            }
        })();
    }, [isDimissible, isVibration, isNotifyAtTheBeginingOfDay, timeBefore]);

    // Round once each day
    useEffect(() => {
        if (isNotifyAtTheBeginingOfDay) removeAll();
    }, [Math.round(new Date().getTime() / (1000 * 60 * 60 * 24))]);

    return updateNotification;
}
