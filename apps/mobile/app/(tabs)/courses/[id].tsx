import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Page({ params: { id } }: { params: { id: string } }) {
    return (
        <View className=" flex-1">
            <SafeAreaView style={{ flex: 1 }}>
                <Text>{id}</Text>
            </SafeAreaView>
        </View>
    );
}
