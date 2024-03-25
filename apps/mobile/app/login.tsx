import React from 'react';
import { View } from 'react-native';
import TextField from '../src/components/TextField/TextField';
import { Button, ButtonText } from '../src/components/ui/Button/Button';
import { Image } from 'expo-image';

import LOGO from '../assets/app-logo.png';

export default function Page() {
    return (
        <View className=" flex flex-col w-full h-full">
            <View
                className=" w-full h-1/2 bg-[#039CCA] flex items-center"
                // style={{
                //     fill: 'linear-gradient(153deg, #EDF1F5 1.34%, #039CCA 96.22%)',
                // }}
            >
                <Image
                    style={{
                        flex: 1,
                        width: 300,
                        backgroundColor: 'transparent',
                    }}
                    // className=" w-[300px] flex-1"
                    source={LOGO}
                    contentFit="contain"
                    transition={1000}
                />
            </View>
            <View className=" mt-5 flex flex-col gap-5 w-full h-fit px-5">
                <TextField title="Username" type="text" placeholder="MSSV" />
                <TextField
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
            >
                <ButtonText className=" text-white">Đăng nhập</ButtonText>
            </Button>
        </View>
    );
}
