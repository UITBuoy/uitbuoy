import { LinearGradient } from 'expo-linear-gradient';
import { router, useRootNavigationState } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { useEffect } from 'react';
import {
    RefreshControl,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MANAGE_COURSE_ANIMATION from '../../assets/animations/new-features/manage-courses.json';
import CourseSearch from '../../src/components/CourseSearch/CourseSearch';
import PageHeader from '../../src/components/PageHeader/PageHeader';
import PreviewMakeupClass from '../../src/components/PreviewMakeupClass';
import RemainingActivities from '../../src/components/RemainingActivities';
import SyncCalendar from '../../src/components/SyncCalendar';
import { useUserMakeUpClassLazyQuery } from '../../src/gql/graphql';
import { useSyncEvent } from '../../src/hooks/events/useSyncEvent';
import { useAuth } from '../../src/stores/auth.store';
import { useEvents } from '../../src/stores/event.store';

export default function Page() {
    const { isLogin } = useAuth();

    const {
        events,
        loading: eventsLoading,
        refetch: refetchEvents,
    } = useEvents();
    const [refetchUserMakeupClasses, { loading: userMakeupClassesLoading }] =
        useUserMakeUpClassLazyQuery();

    const { syncEvent } = useSyncEvent();

    function refetch() {
        refetchEvents({ variables: { isNew: true } });
        refetchUserMakeupClasses({
            fetchPolicy: 'network-only',
        });
    }

    const rootNavigationState = useRootNavigationState();

    useEffect(() => {
        refetch();
        if (!isLogin && rootNavigationState?.key) {
            router.replace('/modals/login');
        }
    }, []);

    useEffect(() => {
        if (events) syncEvent();
    }, [JSON.stringify(events)]);

    return (
        <View className=" flex-1 bg-white">
            <SafeAreaView style={{ flex: 1 }}>
                <PageHeader />
                <ScrollView
                    style={{ flex: 1 }}
                    className=" flex-1 flex-col gap-10"
                    refreshControl={
                        <RefreshControl
                            refreshing={
                                eventsLoading || userMakeupClassesLoading
                            }
                            onRefresh={() => {
                                refetch();
                            }}
                        />
                    }
                >
                    <View style={{ paddingBottom: 100 }}>
                        <CourseSearch />
                        <NewFeatures />
                        <View className=" flex flex-col gap-2">
                            <PreviewMakeupClass />
                        </View>
                        <View className=" mt-10 flex flex-col gap-2">
                            <RemainingActivities />
                            <SyncCalendar />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

function NewFeatures() {
    return (
        <View className=" mt-10">
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
