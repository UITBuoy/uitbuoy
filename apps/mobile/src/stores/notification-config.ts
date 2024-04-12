import { router } from 'expo-router';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { CourseModuleEntity } from '../gql/graphql';

export type INotificationConfig = {
    isVibration: boolean;
    isDimissable: boolean;
    isNotifyAtTheBeginingOfDay: boolean;
    timeBefore: number;
};

export const useNotificationConfig = create<
    INotificationConfig,
    [['zustand/immer', never]]
>(
    immer<INotificationConfig>((set, get) => ({
        isVibration: false,
        isDimissable: false,
        isNotifyAtTheBeginingOfDay: true,
        timeBefore: 12,
        setVibration: (isVibration) => {
            set((state) => {
                state.isVibration = isVibration;
            });
        },
        setDismissable: (isDimissable) => {
            set((state) => {
                state.isDimissable = isDimissable;
            });
        },
        setTimeBefore: (timeBefore) => {
            set((state) => {
                state.timeBefore = timeBefore;
            });
        },
        setIsNotifyAtTheBeginingOfDay: (isNotifyAtTheBeginingOfDay) => {
            set((state) => {
                state.isNotifyAtTheBeginingOfDay = isNotifyAtTheBeginingOfDay;
            });
        },
    })),
);
