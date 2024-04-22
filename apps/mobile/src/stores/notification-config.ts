import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect } from 'react';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { useUploadNotificationConfigMutation } from '../gql/graphql';

export type INotificationConfig = {
    token: string;
    isVibration: boolean;
    isDimissible: boolean;
    isNotifyAtTheBeginingOfDay: boolean;
    timeBefore: number;
    setNotitificationConfig: (config: Partial<INotificationConfig>) => any;
};

export const useNotificationConfigStore = create<
    INotificationConfig,
    [['zustand/persist', never], ['zustand/immer', never]]
>(
    persist(
        immer<INotificationConfig>((set, get) => ({
            token: '',
            isVibration: false,
            isDimissible: true,
            isNotifyAtTheBeginingOfDay: true,
            timeBefore: 1,
            setNotitificationConfig(config) {
                set((state) => ({ ...state, ...config }));
            },
        })),
        {
            name: 'notification-config',
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
);

export function useNotificationConfig() {
    const {
        token,
        isVibration,
        isDimissible,
        isNotifyAtTheBeginingOfDay,
        timeBefore,
        setNotitificationConfig,
    } = useNotificationConfigStore();

    const [upload] = useUploadNotificationConfigMutation();

    useEffect(() => {
        if (token) {
            upload({ variables: { token, beforeDay: timeBefore } });
        }
    }, [timeBefore, token]);

    return {
        token,
        isVibration,
        isDimissible,
        isNotifyAtTheBeginingOfDay,
        timeBefore,
        setNotitificationConfig,
    };
}
