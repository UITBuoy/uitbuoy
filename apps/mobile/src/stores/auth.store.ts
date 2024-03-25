import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export type IAuth = {
    isLogin: boolean;
    access_token: string;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => Promise<boolean>;
};

export const useAuth = create<
    IAuth,
    [['zustand/persist', never], ['zustand/immer', never]]
>(
    persist(
        immer<IAuth>((set, get) => ({
            isLogin: false,
            access_token: '',
            login: async (username, password) => {
                return true;
            },
            logout: async () => {
                return true;
            },
        })),
        {
            name: 'auth',
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
);
