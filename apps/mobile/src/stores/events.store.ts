import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { EventEntity } from '../gql/graphql';

export type IEventStore = {
    events: Partial<EventEntity>[];
    setEvents: (events: any[]) => any;
};

export const useEventStore = create<
    IEventStore,
    [['zustand/persist', never], ['zustand/immer', never]]
>(
    persist(
        immer<IEventStore>((set, get) => ({
            events: [],
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
