import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import NativeButton from '../../src/components/NativeButton/NativeButton';
import { useAddGoogleUserMutation } from '../../src/gql/graphql';

export default function GoogleIntegration() {
    const [addGoogleAccount, { data, loading, error }] =
        useAddGoogleUserMutation();

    useEffect(() => {
        GoogleSignin.configure({
            webClientId:
                '683520066916-c8afnsf4lstvc2dnt43qgusqm2olmiko.apps.googleusercontent.com',
            scopes: [
                'profile',
                'email',
                'https://www.googleapis.com/auth/calendar',
                'https://www.googleapis.com/auth/tasks',
            ],
            offlineAccess: true,
        });
    }, []);

    async function signIn() {
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
            console.log({ userInfo, token });
        } catch (error) {
            console.log({ error, statusCodes });
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    }

    return (
        <View className=" flex-1 items-center bg-white pt-10">
            <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={signIn}
            />
            <NativeButton
                className=" mt-5"
                onPress={async () => {
                    await GoogleSignin.signOut();
                }}
            >
                <View className=" p-4 px-10 bg-primary-90 ">
                    <Text className="color-primary-50 font-medium">
                        Sign out
                    </Text>
                </View>
            </NativeButton>
        </View>
    );
}
