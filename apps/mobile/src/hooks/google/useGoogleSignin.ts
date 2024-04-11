import { GoogleSignin, User } from '@react-native-google-signin/google-signin';
import { useCallback } from 'react';
import { useAddGoogleUserMutation } from '../../gql/graphql';
import { useAuth } from '../../stores/auth.store';

export function useGoogleSignin() {
    const { isIntegrateWithGoogle, googleData, setGoogleData, signOutGoogle } =
        useAuth();
    const [addGoogleAccount] = useAddGoogleUserMutation();

    const signIn = useCallback(
        async (
            callback?: (data: {
                user: User['user'];
                token: { idToken: string; accessToken: string };
            }) => any,
        ) => {
            try {
                await GoogleSignin.hasPlayServices();
                const userInfo = await GoogleSignin.signIn();
                const token = await GoogleSignin.getTokens();
                addGoogleAccount({
                    variables: {
                        accessToken: token.accessToken,
                        googleUser: userInfo.user,
                    },
                });
                setGoogleData({
                    ...userInfo.user,
                    accessToken: token.accessToken,
                });
                console.log({ userInfo, token });

                callback?.({ user: userInfo.user, token });

                return { token, user: userInfo };
            } catch (error) {
                console.log({ error });
            }
        },
        [],
    );

    const getToken = useCallback(async () => {
        if (!isIntegrateWithGoogle) return;
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signInSilently();
        const token = await GoogleSignin.getTokens();
        addGoogleAccount({
            variables: {
                accessToken: token.accessToken,
                googleUser: userInfo.user,
            },
        });
        setGoogleData({
            ...userInfo.user,
            accessToken: token.accessToken,
            lastSync: new Date().getTime(),
        });
        return token;
    }, []);

    const getProfile = useCallback(async () => {
        if (!isIntegrateWithGoogle) return;
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signInSilently();
        const token = await GoogleSignin.getTokens();
        addGoogleAccount({
            variables: {
                accessToken: token.accessToken,
                googleUser: userInfo.user,
            },
        });
        setGoogleData({
            ...userInfo.user,
            accessToken: token.accessToken,
            lastSync: new Date().getTime(),
        });

        return { token, user: userInfo.user };
    }, []);

    return { signIn, getToken, getProfile };
}
