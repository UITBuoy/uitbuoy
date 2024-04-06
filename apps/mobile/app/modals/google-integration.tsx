import React from 'react';
import { View, Text } from 'react-native';
import NativeButton from '../../src/components/NativeButton/NativeButton';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';

export default function GoogleIntegration() {
    GoogleSignin.configure({
        webClientId:
            '683520066916-c8afnsf4lstvc2dnt43qgusqm2olmiko.apps.googleusercontent.com',
        scopes: [
            'profile',
            'email',
            'https://www.googleapis.com/auth/calendar',
        ],
        offlineAccess: true,
        hostedDomain: '',
    });

    async function signIn() {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log({ userInfo });
        } catch (error) {
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
        <View className=" flex-1 bg-white pt-0">
            {/* <NativeButton onPress={() => {}} className=" mt-5 mx-4">
                <View className=" bg-primary-95 p-4">
                    <Text className=" color-primary-50 font-medium">
                        Connect with Google
                    </Text>
                </View>
            </NativeButton> */}
            <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={signIn}
            />
        </View>
    );
}
