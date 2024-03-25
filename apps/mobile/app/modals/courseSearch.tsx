import { useEffect, useRef } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextField from '../../src/components/TextField/TextField';
import { router } from 'expo-router';

export default function Modal() {
    const searchRef = useRef<TextInput>(null);

    useEffect(() => {
        searchRef.current?.focus();
    }, []);

    return (
        <View className=" flex-1 bg-white">
            <SafeAreaView>
                <View className="  mt-4 mx-4 flex flex-row items-center gap-2">
                    <View className=" flex-1 px-4 py-3 rounded-2xl bg-[#F2F2F2] flex flex-row gap-4 items-center">
                        <TextField
                            ref={searchRef}
                            fieldClassName=" text-sm"
                            title="Search"
                            type="text"
                            placeholder="Search for courses..."
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            router.back();
                        }}
                        className=" flex-grow-0 px-4 py-2"
                    >
                        <Text className=" text-neutral-40">Cancel</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}
