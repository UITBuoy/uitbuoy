import { useCallback, useEffect, useState } from 'react';
import { useUserEventsLazyQuery } from '../../gql/graphql';
import { useEventStore } from '../../stores/events.store';
import { useNotificationConfig } from '../../stores/notification-config';
import { useUpdateEventNotification } from '../notifications/useUpdateEventNotification';
import { useSyncEvent } from './useSyncEvent';

export function useEventList() {
    const [loading, setLoading] = useState(false);

    const {
        isDimissible,
        isVibration,
        isNotifyAtTheBeginingOfDay,
        timeBefore,
    } = useNotificationConfig();

    const updateNotification = useUpdateEventNotification();
    const { setEvents } = useEventStore();
    const [refetch_, { data, error }] = useUserEventsLazyQuery();
    const { syncEvent } = useSyncEvent();

    const refetch = useCallback(() => {
        setLoading(true);
        refetch_({
            variables: { isNew: true },
            fetchPolicy: 'cache-first',
            onCompleted(data) {
                setLoading((prev) => false);
                setEvents(data.userEvents);
                data.userEvents.forEach((event) => updateNotification(event));
            },
        });
        syncEvent();
    }, []);

    useEffect(() => {
        if (data?.userEvents)
            data.userEvents.forEach((event) => updateNotification(event));
    }, [isDimissible, isVibration, timeBefore]);

    return { refetch, data, loading, error };
}
