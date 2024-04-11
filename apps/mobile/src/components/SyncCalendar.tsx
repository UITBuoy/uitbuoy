import { Text, TouchableNativeFeedback, View } from 'react-native';
import { useSyncEvent } from '../hooks/events/useSyncEvent';
import { useGoogleSignin } from '../hooks/google/useGoogleSignin';

export default function SyncCalendar() {
    const { signIn } = useGoogleSignin();
    const { syncEvent } = useSyncEvent();

    return (
        <View className=" mx-4 py-4 px-6 rounded-2xl bg-primary-95">
            <Text className=" text-xl text-primary-20 font-bold">
                Đồng bộ với Google
            </Text>
            <Text className=" mt-2">
                Dễ dàng quản lý hạn nộp bài hơn khi tích hợp với Google Calendar
            </Text>
            <View className=" mt-3 self-end flex items-center">
                <TouchableNativeFeedback
                    onPress={async () => {
                        await signIn();
                        await syncEvent();
                    }}
                >
                    <View className=" w-min py-3 px-5 bg-primary-60 rounded-xl">
                        <Text className=" w-min font-semibold text-white">
                            Đồng bộ ngay
                        </Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        </View>
    );
}
