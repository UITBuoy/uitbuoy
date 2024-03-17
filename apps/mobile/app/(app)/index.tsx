import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../../src/components/Button/Button';

import { Text } from '@gluestack-ui/themed';

export default function Page() {
    return (
        <View>
            <StatusBar style="auto" />
            <Text>This is home page</Text>
            <Button>Click me</Button>
        </View>
    );
}
