import { ApolloClient, InMemoryCache } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageWrapper, persistCache } from 'apollo3-cache-persist';
import { useEffect } from 'react';
import { useAuth } from '../../stores/auth.store';
import { useApolloLink } from '../../utils/auth';

export function useCustomApolloClient() {
    const link = useApolloLink();
    const cache = new InMemoryCache();

    const client = new ApolloClient({ link, cache });

    const { authData } = useAuth();

    useEffect(() => {
        async function init() {
            await persistCache({
                cache,
                storage: new AsyncStorageWrapper(AsyncStorage),
            });
        }

        init();
    }, [authData]);

    return client;
}
