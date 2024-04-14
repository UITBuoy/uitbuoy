import {
    ApolloClient,
    ApolloLink,
    createHttpLink,
    gql,
    InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import 'core-js/stable/atob';
import Constants from 'expo-constants';
import { router } from 'expo-router';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../stores/auth.store';
//@ts-ignore
import { EXPO_PUBLIC_ENVIRONMENT, EXPO_PUBLIC_API_URL } from '@env';

const REFRESH_TOKEN = gql`
    mutation RefreshToken {
        refreshToken {
            accessTokenExpiredDate
            access_token
        }
    }
`;

export function useApolloLink() {
    const { authData, refreshAccessToken } = useAuth();

    console.log({
        EXPO_PUBLIC_ENVIRONMENT,
        EXPO_PUBLIC_API_URL,
        env: process.env,
    });

    const link = createHttpLink({
        uri:
            process.env.EXPO_PUBLIC_ENVIRONMENT === 'development' ||
            EXPO_PUBLIC_ENVIRONMENT == 'development'
                ? `http://${Constants.expoConfig.hostUri.split(`:`).shift().concat(`:3001`)}/graphql`
                : process.env.EXPO_PUBLIC_API_URL,
        credentials: 'same-origin',
    });

    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                authorization: authData?.access_token
                    ? `Bearer ${authData?.access_token}`
                    : '',
            },
        };
    });

    const refreshAuthLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                authorization: authData.refresh_token
                    ? `Bearer ${authData.refresh_token}`
                    : '',
            },
        };
    });

    const refreshClient = new ApolloClient({
        link: refreshAuthLink.concat(link),
        cache: new InMemoryCache(),
    });

    const apolloLink = ApolloLink.from([
        new TokenRefreshLink({
            isTokenValidOrUndefined: async () => {
                if (!authData?.access_token) return false;

                try {
                    const decodedAccessToken = jwtDecode(
                        authData?.access_token,
                    );
                    const now = new Date().getTime() / 1000;

                    if (decodedAccessToken.exp <= now) {
                        return false;
                    }

                    return true;
                } catch (error) {
                    console.log({ error });
                }
            },
            fetchAccessToken: async () => {
                const token = await refreshClient.mutate({
                    mutation: REFRESH_TOKEN,
                });
                return {
                    ok: true,
                    status: 200,
                    statusText: 'OK',
                    text: async () => token.data.refreshToken,
                } as unknown as Response;
            },
            handleFetch: (accessToken) => {
                refreshAccessToken(accessToken);
            },
            handleError: (err) => {
                if (
                    err instanceof TypeError &&
                    err.message === 'Network request failed'
                ) {
                    alert('Network error');
                } else {
                    router.replace('/login');
                }
            },
        }),
        authLink,
        link,
    ]);

    return apolloLink;
}
