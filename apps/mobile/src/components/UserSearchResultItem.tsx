import { Text, TouchableNativeFeedback, View } from 'react-native';
import { Course, User } from '../gql/graphql';
import SearchIcon from '../icons/search';
import { router } from 'expo-router';
import { useDetailRoomRouter } from '../stores/room-detail.store';

export default function UserSearchResultItem({
    fullname,
    username,
    email,
    profileimageurl,
    id,
    onPress,
}: Pick<User, 'id' | 'fullname' | 'username' | 'email' | 'profileimageurl'> & {
    onPress?: () => any;
}) {
    const { navigateRoom } = useDetailRoomRouter();

    return (
        <TouchableNativeFeedback
            onPress={() => {
                onPress?.();
                navigateRoom({
                    id: id.toString(),
                    user: {
                        fullname,
                        username,
                        email,
                        id,
                    },
                });
            }}
        >
            <View className=" px-5 py-2 flex flex-row gap-4">
                <SearchIcon className=" mt-2" scale={1.4} />
                <View className="">
                    <Text className=" text-lg font-medium">{fullname}</Text>
                    <Text className=" mt-1 font-light">{username}</Text>
                </View>
            </View>
        </TouchableNativeFeedback>
    );
}
