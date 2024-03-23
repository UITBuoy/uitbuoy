import React from 'react';
import { Text, View } from 'react-native';
import TextField from '../src/components/TextField/TextField';
import Button from '../src/components/Button/Button';

export default function Page() {
    return (
        <View className=" flex flex-col w-full h-full">
            <View
                className=" w-full h-1/2 bg-[#039CCA]"
                // style={{
                //     fill: 'linear-gradient(153deg, #EDF1F5 1.34%, #039CCA 96.22%)',
                // }}
            ></View>
            <View className=" pt-5 w-full h-fit px-5">
                <TextField
                    title="Username"
                    type="text"
                    placeholder="Nhập mã số sinh viên"
                />
                <TextField
                    title="Password"
                    type="password"
                    placeholder="Nhập mật khẩu course"
                />
            </View>
            <Button className="">Đăng nhập</Button>
        </View>
    );
}
