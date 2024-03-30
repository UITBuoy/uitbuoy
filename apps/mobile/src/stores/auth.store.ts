import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { AuthEntity } from '../gql/graphql';

export type IAuth = {
    isLogin: boolean;
    authData?: AuthEntity;
    authLogin: (authEntity: AuthEntity) => boolean;
    authLogout: () => boolean;
};

export const useAuth = create<
    IAuth,
    [['zustand/persist', never], ['zustand/immer', never]]
>(
    persist(
        immer<IAuth>((set, get) => ({
            isLogin: false,
            authLogin: (authEntity) => {
                if (authEntity.access_token) {
                    set((state) => {
                        state.isLogin = true;
                        state.authData = authEntity;
                    });
                    return true;
                }
                return false;
            },
            authLogout: () => {
                set((state) => {
                    state.isLogin = false;
                });
                return true;
            },
        })),
        {
            name: 'auth',
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
);
