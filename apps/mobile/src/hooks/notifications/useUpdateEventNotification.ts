import notifee, { TimestampTrigger, TriggerType } from '@notifee/react-native';
import { useCallback } from 'react';
import { EventEntity } from '../../gql/graphql';
import { timeDiff } from '../../utils/timeDiff';

export function useUpdateEventNotification() {
    const updateNotification = useCallback(async (event: EventEntity) => {
        const channelId = await notifee.createChannel({
            id: 'assignment_due',
            name: 'Thông báo hạn nộp bài tập',
        });

        const trigger: TimestampTrigger = {
            type: TriggerType.TIMESTAMP,
            timestamp: event.timestart * 1000,
        };

        const { time, type } = timeDiff(new Date(event.timestart * 1000));

        await notifee.createTriggerNotification(
            {
                id: event.id.toString(),
                title: event.name,
                body: `<b>Còn ${time} ${type} nữa sẽ đến hạn nộp bài tâp</b><br />
                <p>Bài tập <b>${event.activityname}</b> sẽ hết hạn vào lúc <b>
                ${new Intl.DateTimeFormat('vi-VN', {
                    dateStyle: 'full',
                    timeStyle: 'long',
                    timeZone: 'Asia/Ho_Chi_Minh',
                }).format(event.timestart)}</b></p>`,
                android: {
                    channelId,
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
    }, []);

    return updateNotification;
}
