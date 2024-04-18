import { useCallback, useEffect, useState } from 'react';
import { useUserEventsLazyQuery, useUserEventsQuery } from '../../gql/graphql';
import { useEventStore } from '../../stores/events.store';
import { useNotificationConfig } from '../../stores/notification-config';
import { useSyncEvent } from '../events/useSyncEvent';
import { useUpdateEventNotification } from '../notifications/useUpdateEventNotification';

export function useNotificationCalendar() {
    const {
        isDimissible,
        isVibration,
        isNotifyAtTheBeginingOfDay,
        timeBefore,
    } = useNotificationConfig();

    const updateNotification = useUpdateEventNotification();
    const { data, error } = useUserEventsQuery();
    const { syncEvent } = useSyncEvent();

    useEffect(() => {
        console.log('event thay doi');
    }, [data]);

    // useEffect(() => {
    //     if (data?.userEvents)
    //         data.userEvents.forEach((event) => updateNotification(event));
    // }, [isDimissible, isVibration, timeBefore]);
}
