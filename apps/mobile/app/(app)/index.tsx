import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';

import { Text } from '@gluestack-ui/themed';

export default function Page() {
    return (
        <View>
            <StatusBar style="auto" />
            <Text>This is home page</Text>
        </View>
    );
}
