import { LinearGradient } from 'expo-linear-gradient';
import { router, useRootNavigationState } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MANAGE_COURSE_ANIMATION from '../../assets/animations/new-features/manage-courses.json';
import CourseSearch from '../../src/components/CourseSearch/CourseSearch';
import PageHeader from '../../src/components/PageHeader/PageHeader';
import RemainingActivities from '../../src/components/RemainingActivities/RemainingActivities';
import SyncCalendar from '../../src/components/ui/SyncCalendar/SyncCalendar';
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
                    <PageHeader />
                    <View className=" flex flex-col gap-10 pb-[100px]">
                        <CourseSearch />
                        <NewFeatures />
                        <RemainingActivities />
                        <SyncCalendar />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
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
