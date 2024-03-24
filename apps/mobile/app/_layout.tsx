import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GluestackUIProvider } from '../src/components/gluestack-ui-provider/';
import { Slot } from 'expo-router';

export default function Layout() {
    return (
        <GluestackUIProvider>
            <View style={styles.container}>
                <Slot />
            </View>
        </GluestackUIProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: 0,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
});
