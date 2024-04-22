import { LazyQueryHookExecOptions } from '@apollo/client';
import { DeepPartial } from '@apollo/client/utilities';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import {
    Exact,
    MakeUpClass,
    UserMakeUpClassQuery,
    useUserMakeUpClassLazyQuery,
} from '../gql/graphql';

export type IMakeupClassStore = {
    classes: DeepPartial<MakeUpClass>[];
    loading: boolean;
    setClasses: (classes: DeepPartial<MakeUpClass>[]) => any;
    setLoading: (loading: boolean) => any;
};

const useMakeupClassStore = create<
    IMakeupClassStore,
    [['zustand/persist', never], ['zustand/immer', never]]
>(
    persist(
        immer<IMakeupClassStore>((set, get) => ({
            classes: [],
            loading: false,
            setLoading(loading) {
                set((state) => {
                    state.loading = loading;
                });
            },
            setClasses(classes) {
                set((state) => {
                    state.classes = classes;
                });
            },
        })),
        {
            name: 'makeup-classes',
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
);

export function useMakeupClass() {
    const {
        classes,
        setClasses,
        loading: isLoading,
        setLoading,
    } = useMakeupClassStore();

    const [refetch, { loading }] = useUserMakeUpClassLazyQuery();

    useEffect(() => {
        refetch({
            fetchPolicy: 'network-only',
            onCompleted(data) {
                setClasses(data.makeUpClass);
            },
        });
    }, []);

    return {
        classes,
        loading: isLoading,
        refetch: async (
            options?: Partial<
                LazyQueryHookExecOptions<UserMakeUpClassQuery, Exact<{}>>
            >,
        ) => {
            setLoading(true);
            const response = await refetch({
                ...options,
                fetchPolicy: 'network-only',
            });
            setClasses(response.data.makeUpClass);
            setLoading(false);
        },
        removeAll: () => {
            setClasses([]);
        },
    };
}
