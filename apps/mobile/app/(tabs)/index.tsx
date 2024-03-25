import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useRootNavigationState } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { useEffect } from 'react';
import {
    ScrollView,
    Text,
    TouchableNativeFeedback,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MANAGE_COURSE_ANIMATION from '../../assets/animations/new-features/manage-courses.json';
import EMPTY_REMAINING_ACTIVITIES from '../../assets/empty-remaining-activities.png';
import TextField from '../../src/components/TextField/TextField';
import SyncCalendar from '../../src/components/ui/SyncCalendar/SyncCalendar';
import DrawerIcon from '../../src/icons/drawer';
import MessageIcon from '../../src/icons/message';
import NotificationIcon from '../../src/icons/notification';
import SearchIcon from '../../src/icons/search';
import { useAuth } from '../../src/stores/auth.store';

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
                <ScrollView>
                    <Header />
                    <View className=" flex flex-col gap-10 pb-[100px]">
                        <SearchButton />
                        <NewFeatures />
                        <RemainingActivities />
                        <SyncCalendar />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

function Header() {
    return (
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
    );
}

function SearchButton() {
    return (
        <TouchableNativeFeedback
            onPress={() => {
                router.push('/modals/courseSearch');
            }}
        >
            <View className=" rounded-2xl mt-4 mx-4 px-4 py-3 bg-[#F2F2F2] flex flex-row gap-4 items-center">
                <SearchIcon />
                <TextField
                    editable={false}
                    fieldClassName=" text-sm"
                    title="Search"
                    type="text"
                    placeholder="Search for courses..."
                />
            </View>
        </TouchableNativeFeedback>
    );
}

function NewFeatures() {
    return (
        <View className=" mt-0">
            <Text className=" mx-4 text-base font-semibold">What's new?</Text>
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                    router.push('/courses');
                }}
            >
                <LinearGradient
                    style={{ borderRadius: 16 }}
                    className=" flex flex-row items-end pb-3 h-[180px] mx-4 mt-4 rounded-2xl"
                    colors={['#13AEDD', '#86E0FB']}
                    end={{ x: 0.8, y: 0.9 }}
                    locations={[0.2, 0.8]}
                >
                    <View className=" w-1/2 h-full flex flex-col justify-center pl-6 ">
                        <Text className=" w-full font-semibold text-xl text-primary-99">
                            All course in one!
                        </Text>
                        <Text className=" text-md mt-3 text-primary-90">
                            Manage your courses, documents, exercises in one
                            place
                        </Text>
                    </View>
                    <LottieView
                        autoPlay
                        style={{
                            flex: 1,
                            width: 160,
                            height: 160,
                        }}
                        resizeMode="cover"
                        source={MANAGE_COURSE_ANIMATION}
                    />
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
}

function RemainingActivities() {
    return (
        <View className=" mt-0">
            <Text className=" mx-4 text-base font-semibold">
                Remaining activities
            </Text>
            <View>
                <Image
                    style={{
                        flex: 1,
                        width: '100%',
                        height: 230,
                        marginTop: 20,
                    }}
                    contentFit="contain"
                    transition={1000}
                    source={EMPTY_REMAINING_ACTIVITIES}
                />
            </View>
        </View>
    );
}
