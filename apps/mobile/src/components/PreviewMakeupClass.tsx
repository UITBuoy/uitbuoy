import { useEffect } from 'react';
import { FlatList, View, Text } from 'react-native';
import { useUserMakeUpClassQuery } from '../gql/graphql';
import UserMakeupClass from './UserMakeupClass';
import PreviewMakeupClassSkeleton from '../skeletons/PreviewMakeupClassSkeleton';
import NativeButton from './NativeButton/NativeButton';
import { router } from 'expo-router';

export default function PreviewMakeupClass() {
    const { data, loading, error, refetch } = useUserMakeUpClassQuery();

    useEffect(() => {
        refetch();
    }, []);

    return (
        <View>
            <Text className=" mx-4 font-semibold mb-4">Các thông báo</Text>
            {loading ? (
                <PreviewMakeupClassSkeleton />
            ) : (
                <>
                    <FlatList
                        contentContainerStyle={{
                            flexDirection: 'column',
                            gap: 8,
                        }}
                        scrollEnabled={false}
                        data={data.makeUpClass.slice(0, 2)}
                        renderItem={({ item }) => (
                            <UserMakeupClass makeupClass={item} />
                        )}
                        keyExtractor={(item) => item.title}
                    />
                    <View className=" mt-4 flex-col items-center">
                        <NativeButton
                            onPress={() =>
                                router.push('/modals/makeup-classes')
                            }
                        >
                            <View className=" flex p-2 px-10">
                                <Text className=" font-medium">Xem thêm</Text>
                            </View>
                        </NativeButton>
                    </View>
                </>
            )}
        </View>
    );
}
