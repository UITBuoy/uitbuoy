import { router } from 'expo-router';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Room } from '../gql/graphql';
import { DeepPartial } from '@apollo/client/utilities';

export type IRoomDetailRouter = {
    room?: DeepPartial<Room>;
    navigateRoom: (room: DeepPartial<Room>) => any;
};

export const useDetailRoomRouter = create<
    IRoomDetailRouter,
    [['zustand/immer', never]]
>(
    immer<IRoomDetailRouter>((set, get) => ({
        navigateRoom: (room: DeepPartial<Room>) => {
            set((state) => {
                state.room = room;
            });
            router.push({
                pathname: '/modals/chat-room',
                params: { id: get().room },
            });
        },
    })),
);
