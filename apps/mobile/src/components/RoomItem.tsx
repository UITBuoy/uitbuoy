import { Text, View, Image } from 'react-native';
import { Room } from '../gql/graphql';
import { DeepPartial } from '@apollo/client/utilities';
import NativeButton from './NativeButton/NativeButton';
import { router } from 'expo-router';
import { useDetailRoomRouter } from '../stores/room-detail.store';

type Props = {
    room: DeepPartial<Room>;
};

export default function RoomItem({ room }: Props) {
    const { navigateRoom } = useDetailRoomRouter();

    return (
        <View className=" m-2">
            <NativeButton
                onPress={() => {
                    navigateRoom(room);
                }}
            >
                <View className=" px-4 py-2 flex-row gap-2 items-center">
                    <Image
                        source={{
                            uri: room.user.profileimageurlsmall,
                        }}
                        style={{ width: 50, height: 50 }}
                        className=" rounded-2xl"
                    />
                    <View className=" flex-1">
                        <Text className=" text-lg font-semibold">
                            {room.user.fullname}
                        </Text>
                        <View className=" flex-1 flex-row justify-between gap-2">
                            <Text>{room.lastMessage.content}</Text>
                            <Text>
                                {new Intl.DateTimeFormat('vi-VN', {
                                    timeStyle: 'short',
                                    timeZone: 'Asia/Ho_Chi_Minh',
                                }).format(new Date(room.lastMessage.date))}
                            </Text>
                        </View>
                    </View>
                </View>
            </NativeButton>
        </View>
    );
}
