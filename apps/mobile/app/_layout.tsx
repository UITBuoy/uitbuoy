import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { Slot } from 'expo-router';

export default function Layout() {
    return (
        <GluestackUIProvider config={config}>
            <SafeAreaView style={styles.container}>
                <Slot />
            </SafeAreaView>
        </GluestackUIProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
});
