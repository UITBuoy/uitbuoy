import { router } from 'expo-router';
import { useEffect } from 'react';
import { Image, RefreshControl, ScrollView, Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import NativeButton from '../../src/components/NativeButton/NativeButton';
import {
    useProfileLazyQuery,
    useSyncEventMutation,
} from '../../src/gql/graphql';
import { useGoogleSignin } from '../../src/hooks/google/useGoogleSignin';
import ProfileScreenSkeleton from '../../src/skeletons/ProfileScreenSkeleton';
import { useAuth } from '../../src/stores/auth.store';

export default function Page() {
    const { isIntegrateWithGoogle, googleData, authLogout } = useAuth();

    const { signIn } = useGoogleSignin();

    const [refetch, { data, loading, error }] = useProfileLazyQuery();
    const [syncEvent] = useSyncEventMutation();

    useEffect(() => {
        refetch();
    }, []);

    return (
        <View className=" flex-1 bg-white">
            <SafeAreaView className="">
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            onRefresh={() =>
                                refetch({ fetchPolicy: 'no-cache' })
                            }
                        />
                    }
                >
                    {loading || !data?.profile ? (
                        <ProfileScreenSkeleton />
                    ) : (
                        <View className="" style={{}}>
                            <Animated.View
                                style={{ marginTop: 80 }}
                                className=" mx-4 p-4 rounded-md flex flex-col gap-4"
                                entering={FadeIn}
                                exiting={FadeOut}
                            >
                                <Image
                                    source={{
                                        uri: data.profile.profileimageurl
                                            .split('?')
                                            .at(0),
                                    }}
                                    style={{ width: 100, height: 100 }}
                                    className=" rounded-2xl"
                                />
                                <View className=" flex flex-col gap-1">
                                    <Text className=" font-semibold text-lg">
                                        {data.profile.fullname}
                                    </Text>
                                    <Text className=" text-neutral-40">
                                        {data.profile.email}
                                    </Text>
                                </View>
                            </Animated.View>
                            <Animated.View
                                className=" mx-4 p-4"
                                entering={FadeIn}
                                exiting={FadeOut}
                            >
                                <View className=" flex flex-col gap-1">
                                    <Text className=" text-neutral-40">
                                        Mã số sinh viên
                                    </Text>
                                    <Text className=" font-semibold text-lg">
                                        {data.profile.username}
                                    </Text>
                                </View>
                            </Animated.View>
                        </View>
                    )}
                    {isIntegrateWithGoogle && googleData ? (
                        <>
                            <Text className=" mx-4 mt-10 px-4 font-semibold text-lg">
                                Tài khoản Google
                            </Text>
                            <NativeButton
                                className=" mx-4 mt-1"
                                onPress={() => {
                                    router.push({
                                        pathname: '/modals/google-integration',
                                    });
                                }}
                            >
                                <View className="p-4 rounded-md flex flex-row gap-4">
                                    <Image
                                        source={{ uri: googleData.photo }}
                                        className=" w-12 h-12 rounded-full"
                                    />
                                    <View className=" flex flex-col gap-[2px]">
                                        <Text className=" font-semibold text-lg">
                                            {googleData.name}
                                        </Text>
                                        <Text className=" text-neutral-40">
                                            {googleData.email}
                                        </Text>
                                    </View>
                                </View>
                            </NativeButton>
                        </>
                    ) : (
                        <View className=" mx-4 mt-5">
                            <View className="p-4 flex flex-col gap-4 bg-primary-70 rounded-2xl">
                                <Text className=" font-semibold text-lg text-white">
                                    Tích hợp với Google
                                </Text>
                                <View className=" flex flex-col gap-1">
                                    <Text className=" font-normal text-base text-white">
                                        - Đồng bộ deadline với Google Task,
                                        Google Calendar
                                    </Text>
                                    <Text className=" font-normal text-base text-white">
                                        - Đăng nhập nhanh chóng
                                    </Text>
                                </View>
                                <View className=" ml-auto">
                                    <NativeButton
                                        onPress={() => {
                                            signIn(
                                                ({
                                                    user: { id },
                                                    token: { accessToken },
                                                }) => {
                                                    syncEvent({
                                                        variables: {
                                                            googleUserId: id,
                                                            accessToken,
                                                        },
                                                    });
                                                },
                                            );
                                        }}
                                    >
                                        <View className=" bg-white p-4">
                                            <Text
                                                style={{ color: '#3FB7E6' }}
                                                className=" font-medium"
                                            >
                                                Đăng nhập
                                            </Text>
                                        </View>
                                    </NativeButton>
                                </View>
                            </View>
                        </View>
                    )}
                    <NativeButton
                        className=" mx-6 mt-10"
                        onPress={async () => {
                            router.replace('/login');
                            authLogout();
                        }}
                    >
                        <View className=" p-4 px-10 rounded-2xl bg-[#FE5050] flex-row justify-center gap-2">
                            <Text className=" text-white font-medium">
                                Đăng xuất
                            </Text>
                        </View>
                    </NativeButton>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}
