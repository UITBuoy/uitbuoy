import { router } from 'expo-router';
import { useEffect } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import CHEVRON from '../../assets/arrow-left.png';
import NOTIFICATION from '../../assets/notification.png';
import { useUserMakeUpClassQuery } from '../gql/graphql';
import PreviewMakeupClassSkeleton from '../skeletons/PreviewMakeupClassSkeleton';
import NativeButton from './NativeButton/NativeButton';
import UserMakeupClass from './UserMakeupClass';
import HeaderButton from './HeaderButton';

export default function PreviewMakeupClass() {
    const { data, loading, error, refetch } = useUserMakeUpClassQuery();

    useEffect(() => {
        refetch();
    }, []);

    return (
        <View className=" flex flex-col gap-2">
            <HeaderButton
                icon={NOTIFICATION}
                title="Các lớp học bù hoặc HT2"
                subTitle="Nhấn vào để xem tất cả các thông báo"
                onPress={() => {
                    router.push('/modals/makeup-classes');
                }}
            />
            {loading || !data?.makeUpClass ? (
                <PreviewMakeupClassSkeleton />
            ) : (
                <>
                    <FlatList
                        contentContainerStyle={{
                            flexDirection: 'column',
                            gap: 8,
                        }}
                        scrollEnabled={false}
                        data={data.makeUpClass}
                        renderItem={({ item }) => (
                            <UserMakeupClass makeupClass={item} />
                        )}
                        keyExtractor={(item) => item.title}
                    />
                </>
            )}
        </View>
    );
}
