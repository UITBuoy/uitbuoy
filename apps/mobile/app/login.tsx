import React, { useRef, useState } from 'react';
import { TextInput, View } from 'react-native';
import TextField from '../src/components/TextField/TextField';
import { Button, ButtonText } from '../src/components/ui/Button/Button';
import { Image } from 'expo-image';

import LOGO from '../assets/app-logo.png';
import { useLogin } from '../src/hooks/auth/useLogin';
import { router } from 'expo-router';
import { useAuth } from '../src/stores/auth.store';

export default function Page() {
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();

    const { login } = useLogin();

    const { isLogin } = useAuth();

    if (isLogin) {
        router.replace('/');
    }

    return (
        <View className=" flex flex-col w-full h-full">
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
                    value={username}
                    onChangeText={(value) => setUsername(value)}
                    title="Username"
                    type="text"
                    placeholder="MSSV"
                />
                <TextField
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                    title="Password"
                    type="password"
                    placeholder="Mật khẩu"
                />
            </View>
            <Button
                className=" bg-sky-500 h-fit p-3 mt-5 mx-5"
                size="md"
                variant="solid"
                action="primary"
                onPress={async () => {
                    if (login(username, password)) router.replace('/');
                }}
            >
                <ButtonText className=" text-white">Đăng nhập</ButtonText>
            </Button>
        </View>
    );
}
