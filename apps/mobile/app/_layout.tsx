import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Slot } from 'expo-router';
import { GluestackUIProvider } from '../src/components/gluestack-ui-provider/';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import '../global.css';

export default function Layout() {
    const client = new ApolloClient({
        uri: 'http://192.168.1.6:3001/graphql',
        cache: new InMemoryCache(),
    });

    return (
        <GluestackUIProvider>
            <ApolloProvider client={client}>
                <View style={styles.container}>
                    <Slot />
                </View>
            </ApolloProvider>
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
