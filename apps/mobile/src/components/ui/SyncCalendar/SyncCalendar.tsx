import {
    Text,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableNativeFeedbackComponent,
    TouchableOpacity,
    View,
} from 'react-native';

export default function SyncCalendar() {
    return (
        <View className=" mx-4 py-4 px-6 rounded-2xl bg-primary-95">
            <Text className=" text-xl text-primary-20 font-bold">
                Sync with Google Calendar
            </Text>
            <Text className=" mt-2">
                Connect to your Google account to sync with Google calendar.
            </Text>
            <View className=" mt-3 self-end flex items-center">
                <TouchableNativeFeedback>
                    <View className=" w-min py-3 px-5 bg-primary-60 rounded-xl">
                        <Text className=" w-min font-semibold text-white">
                            Connect
                        </Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        </View>
    );
}
