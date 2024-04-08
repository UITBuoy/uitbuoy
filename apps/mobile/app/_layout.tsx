import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from '@react-navigation/native';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Stack } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Platform, useColorScheme } from 'react-native';
import '../global.css';
import { GluestackUIProvider } from '../src/components/gluestack-ui-provider/';
import { useApolloLink } from '../src/utils/auth';

export const unstable_settings = {
    initialRouteName: '(tabs)',
};

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
    const message = {
        to: expoPushToken,
        sound: 'default',
        title: 'Original Title',
        body: 'And here is the body!',
        data: { someData: 'goes here' },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
}

async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } =
            await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = await Notifications.getExpoPushTokenAsync({
            projectId: Constants.expoConfig.extra.eas.projectId,
        });
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    return token.data;
}

export default function Layout() {
    const colorScheme = useColorScheme();

    const link = useApolloLink();

    const client = new ApolloClient({
        link,
        cache: new InMemoryCache(),
    });
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef(null);
    const responseListener = useRef(null);

    useEffect(() => {
        registerForPushNotificationsAsync().then((token) => {
            console.log({ token });
            return setExpoPushToken(token);
        });

        notificationListener.current =
            Notifications.addNotificationReceivedListener((notification) => {
                console.log({ notification });
                setNotification(!!notification);
            });

        responseListener.current =
            Notifications.addNotificationResponseReceivedListener(
                (response) => {
                    console.log(response);
                },
            );

        return () => {
            Notifications.removeNotificationSubscription(
                notificationListener.current,
            );
            Notifications.removeNotificationSubscription(
                responseListener.current,
            );
        };
    }, []);

    return (
        <GluestackUIProvider>
            <ApolloProvider client={client}>
                <ThemeProvider
                    value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
                >
                    <Stack>
                        <Stack.Screen
                            name="(tabs)"
                            options={{
                                headerShown: false,
                                animation: 'slide_from_right',
                            }}
                        />
                        <Stack.Screen
                            name="login"
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="modals/courseSearch"
                            options={{
                                headerShown: false,
                                presentation: 'modal',
                                animation: 'fade_from_bottom',
                            }}
                        />
                        <Stack.Screen
                            name="modals/courseDetail"
                            options={{
                                title: 'Detail course',
                                presentation: 'modal',
                                animation: 'fade_from_bottom',
                                headerShadowVisible: false,
                                headerStyle: { backgroundColor: '#039CCA' },
                                headerTintColor: 'white',
                                headerTitleStyle: { fontSize: 16 },
                            }}
                        />
                        <Stack.Screen
                            name="modals/detail-activity"
                            options={{
                                title: 'Activity',
                                presentation: 'modal',
                                animation: 'fade_from_bottom',
                                headerShadowVisible: false,
                                headerStyle: { backgroundColor: 'white' },
                                headerTintColor: 'black',
                                headerTitleStyle: { fontSize: 16 },
                                headerTitleAlign: 'center',
                            }}
                        />
                        <Stack.Screen
                            name="modals/detail-folder"
                            options={{
                                title: 'Folder',
                                presentation: 'modal',
                                animation: 'fade_from_bottom',
                                headerShadowVisible: false,
                                headerStyle: { backgroundColor: 'white' },
                                headerTintColor: 'black',
                                headerTitleStyle: { fontSize: 16 },
                                headerTitleAlign: 'center',
                            }}
                        />
                        <Stack.Screen
                            name="modals/google-integration"
                            options={{
                                title: 'Google integration',
                                presentation: 'modal',
                                animation: 'fade_from_bottom',
                                headerShadowVisible: false,
                                headerStyle: { backgroundColor: 'white' },
                                headerTintColor: 'black',
                                headerTitleStyle: { fontSize: 16 },
                                headerTitleAlign: 'center',
                            }}
                        />
                    </Stack>
                </ThemeProvider>
            </ApolloProvider>
        </GluestackUIProvider>
    );
}
