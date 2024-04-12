import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { EventEntity } from '../gql/graphql';

export type IEventStore = {
    events: Partial<EventEntity>[];
    setEvents: (events: any[]) => any;
};

export const useEventStore = create<IEventStore, [['zustand/immer', never]]>(
    immer<IEventStore>((set, get) => ({
        events: [],
        setEvents(events) {
            set((state) => {
                state.events = events;
            });
        },
    })),
);
