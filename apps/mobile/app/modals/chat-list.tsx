import { useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { useRoomsQuery } from '../../src/gql/graphql';
import RoomItem from '../../src/components/RoomItem';

export default function Page() {
    const navigation = useNavigation();

    const { data, loading } = useRoomsQuery({ fetchPolicy: 'network-only' });

    useEffect(() => {
        navigation.setOptions({ title: 'Nhắn tin' });
    }, []);

    return (
        <View className=" flex-1 bg-white pt-0">
            {loading ? (
                <></>
            ) : (
                <View>
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
