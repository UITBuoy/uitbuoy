import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';
import { Alert, Text, ToastAndroid, View } from 'react-native';
import TextField from '../src/components/TextField/TextField';

import { router, useRootNavigationState } from 'expo-router';
import LOGO from '../assets/app-logo.png';
import NativeButton from '../src/components/NativeButton/NativeButton';
import { useLogin } from '../src/hooks/auth/useLogin';
import { useAuth } from '../src/stores/auth.store';
import { Spinner } from '@gluestack-ui/themed';

export default function Page() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const { isLogin } = useAuth();

    const rootNavigationState = useRootNavigationState();

    useEffect(() => {
        if (isLogin && rootNavigationState?.key) {
            router.replace('/');
        }
    }, []);

    return (
        <View className=" flex flex-col w-full h-full bg-white">
            <View className=" w-full h-1/2 bg-[#039CCA] flex items-center">
                <Image
                    style={{
                        flex: 1,
                        width: 300,
                        backgroundColor: 'transparent',
                    }}
                    source={LOGO}
                    contentFit="contain"
                    transition={1000}
                />
            </View>
            <View className=" mt-5 flex flex-col gap-5 w-full h-fit px-5">
                <TextField
                    className=" border-[1px] rounded-full py-2 px-4"
                    value={username}
                    onChangeText={(value) => setUsername(value)}
                    title="Username"
                    type="text"
                    keyboardType="number-pad"
                    placeholder="MSSV"
                />
                <TextField
                    className=" border-[1px] rounded-full py-2 px-4"
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                    title="Password"
                    type="password"
                    placeholder="Mật khẩu"
                />
            </View>
            <SignInButton username={username} password={password} />
        </View>
    );
}

function SignInButton({
    username,
    password,
}: {
    username: string;
    password: string;
}) {
    const { login, loading } = useLogin();

    return (
        <View className="mt-5">
            <NativeButton
                disabled={loading}
                onPress={async () => {
                    if (username.length !== 8)
                        Alert.alert(
                            'Lỗi đăng nhập',
                            'Mã số sinh viên phải có đủ 8 ký tự',
                        );
                    else if (!password)
                        Alert.alert('Lỗi đăng nhập', 'Bạn phải nhập mật khẩu');
                    else {
                        const data = await login(username, password);
                        if (data) {
                            router.replace('/modals/sign-in-resolve');
                        } else {
                            Alert.alert(
                                'Lỗi đăng nhập',
                                'Mã số sinh viên hoặc mật khẩu không đúng',
                            );
                        }
                    }
                }}
            >
                <View className=" flex flex-row justify-center gap-2 rounded-2xl bg-sky-500 h-fit p-3 mx-5">
                    {loading ? <Spinner color="white" /> : null}
                    <Text className=" text-white text-center font-medium">
                        Đăng nhập
                    </Text>
                </View>
            </NativeButton>
        </View>
    );
}
