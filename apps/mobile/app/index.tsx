import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import Button from '../components/Button/Button';

import { Text } from '@gluestack-ui/themed';

export default function App() {
    return (
        <>
            <StatusBar style="auto" />
            <Text>This is home page</Text>
            <Button>Click me</Button>
        </>
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
