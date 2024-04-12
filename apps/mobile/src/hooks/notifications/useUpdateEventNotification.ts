import { DeepPartial } from '@apollo/client/utilities';
import notifee, {
    AndroidStyle,
    EventType,
    TimestampTrigger,
    TriggerType,
} from '@notifee/react-native';
import { useCallback, useEffect } from 'react';
import { EventEntity } from '../../gql/graphql';
import { useNotificationConfig } from '../../stores/notification-config';
import { timeDiff } from '../../utils/timeDiff';

export function useUpdateEventNotification() {
    const {
        isDimissible,
        isVibration,
        isNotifyAtTheBeginingOfDay,
        timeBefore,
    } = useNotificationConfig();

    const updateNotification = useCallback(
        async (event: DeepPartial<EventEntity>) => {
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

            const trigger: TimestampTrigger = {
                type: TriggerType.TIMESTAMP,
                timestamp: event.timestart * 1000 - timeBefore * 3_600_000,
            };

            const { time, type } = timeDiff(new Date(event.timestart * 1000));

            await notifee.createTriggerNotification(
                {
                    id: event.id.toString(),
                    title: event.name,
                    body: `Còn <b>${-time} ${type}</b> nữa sẽ đến hạn nộp bài tâp<br /> `,
                    android: {
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
                        actions: [
                            {
                                title: 'Xem bài tập',
                                pressAction: {
                                    id: 'view',
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
                    console.log(
                        'User pressed notification',
                        detail.notification,
                    );
                    break;
            }
        });
    }, []);

    return updateNotification;
}
