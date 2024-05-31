import { router } from 'expo-router';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Subject } from '../gql/graphql';
import { DeepPartial } from '@apollo/client/utilities';

export type IRoomDetailRouter = {
    id: string;
    navigateRoom: (id: string) => any;
};

export const useDetailRoomRouter = create<
    IRoomDetailRouter,
    [['zustand/immer', never]]
>(
    immer<IRoomDetailRouter>((set, get) => ({
        id: '',
        navigateRoom: (id: string) => {
            set((state) => {
                state.id = id;
            });
            router.push({
                pathname: '/modals/chat-room',
                params: { id: get().id },
            });
        },
    })),
);
