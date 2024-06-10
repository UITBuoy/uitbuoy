import { router, useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { FlatList, TouchableNativeFeedback, View } from 'react-native';
import RoomItem from '../../src/components/RoomItem';
import TextField from '../../src/components/TextField/TextField';
import { useRoomsQuery } from '../../src/gql/graphql';
import SearchIcon from '../../src/icons/search';

export default function Page() {
    const navigation = useNavigation();

    const { data, loading } = useRoomsQuery({ fetchPolicy: 'network-only' });

    useEffect(() => {
        navigation.setOptions({ title: 'Nhắn tin' });
    }, []);

    return (
        <View className=" flex-1 bg-white pt-0">
            <TouchableNativeFeedback
                onPress={() => {
                    router.push('/modals/chatSearch');
                }}
            >
                <View className=" rounded-2xl mx-4 px-4 py-3 bg-[#F2F2F2] flex flex-row gap-4 items-center">
                    <SearchIcon />
                    <TextField
                        editable={false}
                        fieldClassName=" text-sm"
                        title="Search"
                        type="text"
                        placeholder="Search for user..."
                    />
                </View>
            </TouchableNativeFeedback>
            {loading ? (
                <></>
            ) : (
                <View className=" mt-4">
                    <FlatList
                        data={data.rooms}
                        renderItem={({ item }) => <RoomItem room={item} />}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            )}
        </View>
    );
}
