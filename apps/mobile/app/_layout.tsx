import React from 'react';
import { StyleSheet, View } from 'react-native';

import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { Slot } from 'expo-router';

export default function Layout() {
    return (
        <GluestackUIProvider config={config}>
            <View style={styles.container}>
                <Slot />
            </View>
        </GluestackUIProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
