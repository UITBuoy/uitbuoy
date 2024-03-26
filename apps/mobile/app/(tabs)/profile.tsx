import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../src/stores/auth.store';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Page() {
    const { authLogout } = useAuth();

    return (
        <SafeAreaView className=" pt-10">
            <TouchableOpacity
                className=" mt-10"
                onPress={() => {
                    router.replace('/login');
                    authLogout();
                }}
            >
                <Text>Logout</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
