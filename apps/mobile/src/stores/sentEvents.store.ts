import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export type ISentEvents = {
    eventIds: string[];
    setEventIds: (eventIds: string[]) => any;
    addEventIds: (eventIds: string[]) => any;
    removeAll: () => any;
};

export const useSentEvents = create<
    ISentEvents,
    [['zustand/persist', never], ['zustand/immer', never]]
>(
    persist(
        immer<ISentEvents>((set, get) => ({
            eventIds: [],
            setEventIds(eventIds) {
                set((state) => {
                    state.eventIds = eventIds;
                });
            },
            addEventIds(eventIds) {
                set((state) => {
                    state.eventIds = [
                        ...get().eventIds.filter(
                            (id) => !eventIds.includes(id),
                        ),
                        ...eventIds,
                    ];
                });
            },
            removeAll: () => {
                set((state) => {
                    state.eventIds = [];
                });
            },
        })),
        {
            name: 'events',
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
);
