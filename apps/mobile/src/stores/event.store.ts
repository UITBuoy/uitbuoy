import { LazyQueryHookExecOptions } from '@apollo/client';
import { DeepPartial } from '@apollo/client/utilities';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import {
    EventEntity,
    Exact,
    UserEventsQuery,
    useUserEventsLazyQuery,
} from '../gql/graphql';

export type IEventStore = {
    events: DeepPartial<EventEntity>[];
    loading: boolean;
    setEvents: (events: DeepPartial<EventEntity>[]) => any;
    setLoading: (loading: boolean) => any;
};

const useEventStore = create<
    IEventStore,
    [['zustand/persist', never], ['zustand/immer', never]]
>(
    persist(
        immer<IEventStore>((set, get) => ({
            events: [],
            loading: false,
            setLoading(loading) {
                set((state) => {
                    state.loading = loading;
                });
            },
            setEvents(events) {
                set((state) => {
                    state.events = events;
                });
            },
        })),
        {
            name: 'events',
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
);

export function useEvents() {
    const {
        events,
        setEvents,
        loading: isLoading,
        setLoading,
    } = useEventStore();

    const [refetch, { loading, refetch: _refetch }] = useUserEventsLazyQuery();

    useEffect(() => {
        setLoading(false);
        refetch({
            fetchPolicy: 'network-only',
            onCompleted(data) {
                setEvents(data.userEvents);
            },
        });
    }, []);

    return {
        events,
        loading: loading || isLoading,
        refetch: async (
            options?: Partial<
                LazyQueryHookExecOptions<
                    UserEventsQuery,
                    Exact<{ isNew?: boolean }>
                >
            >,
        ) => {
            setLoading(true);
            const response = await refetch({
                ...options,
                fetchPolicy: 'network-only',
            });
            setEvents(response.data.userEvents);
            setLoading(false);
        },
        removeAll: () => {
            setEvents([]);
        },
    };
}
