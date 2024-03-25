import React, { useEffect } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';

import { router, useRootNavigationState } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import DrawerIcon from '../../src/icons/drawer';
import { useAuth } from '../../src/stores/auth.store';
import MessageIcon from '../../src/icons/message';
import NotificationIcon from '../../src/icons/notification';
import SearchIcon from '../../src/icons/search';
import TextField from '../../src/components/TextField/TextField';

export default function Page() {
    const { isLogin, authLogout } = useAuth();

    const rootNavigationState = useRootNavigationState();

    useEffect(() => {
        if (!isLogin && rootNavigationState.key) {
            router.replace('/login');
        }
    }, []);

    return (
        <View className=" flex-1 bg-white">
            <SafeAreaView>
                <ScrollView className="">
                    <View className=" px-4 py-2 flex flex-row">
                        <TouchableOpacity className=" p-1 mr-auto">
                            <DrawerIcon />
                        </TouchableOpacity>
                        <View className=" flex flex-row gap-6">
                            <TouchableOpacity className=" p-1">
                                <MessageIcon />
                            </TouchableOpacity>
                            <TouchableOpacity className=" p-1">
                                <NotificationIcon />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            router.push('/modals/courseSearch');
                        }}
                    >
                        <View className=" mt-4 mx-4 px-4 py-3 rounded-2xl bg-[#F2F2F2] flex flex-row gap-4 items-center">
                            <SearchIcon />
                            <TextField
                                editable={false}
                                fieldClassName=" text-sm"
                                title="Search"
                                type="text"
                                placeholder="Search for courses..."
                            />
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}
