import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';

import { Text } from '@gluestack-ui/themed';
import { useAuth } from '../../src/stores/auth.store';
import { router } from 'expo-router';
import { Button } from '../../src/components/ui/Button/Button';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Page() {
    const { isLogin, authLogout } = useAuth();

    if (!isLogin) {
        router.replace('/login');
    }

    return (
        <View className=" flex-1 bg-white">
            <SafeAreaView>
                <Text>This is home page</Text>
            </SafeAreaView>
            {/* <StatusBar style="auto" />
            <Text>This is home page</Text>
            <Button
                onPress={() => {
                    authLogout();
                }}
            >
                <Text>Signout</Text>
            </Button> */}
        </View>
    );
}
