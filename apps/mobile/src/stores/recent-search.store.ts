import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export type IRecentSearch = {
    recentSearchStrings: string[];
    addSearchString: (value: string) => string[];
};

export const useRecentSearch = create<
    IRecentSearch,
    [['zustand/persist', never], ['zustand/immer', never]]
>(
    persist(
        immer<IRecentSearch>((set, get) => ({
            recentSearchStrings: [],
            addSearchString(value) {
                const newSearchStringList = [
                    value,
                    ...get().recentSearchStrings.filter(
                        (searchString) => searchString !== value,
                    ),
                ];
                set((state) => {
                    state.recentSearchStrings = newSearchStringList;
                });
                return newSearchStringList;
            },
        })),
        {
            name: 'recent-search-string',
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
);

export const MAX_RECENT_SEARCH_ITEM = 3;
