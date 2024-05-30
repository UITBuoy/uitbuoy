import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '../../../src/components/PrimaryButton';
import { router } from 'expo-router';

export default function Page() {
    return (
        <View className=" flex-1 bg-white">
            <SafeAreaView>
                <Text>Choose options</Text>
                <PrimaryButton
                    onPress={() => {
                        router.push('/modals/recommend-path/result');
                    }}
                >
                    <Text className=" font-medium text-white">
                        Gợi ý lộ trình học
                    </Text>
                </PrimaryButton>
            </SafeAreaView>
        </View>
    );
}
