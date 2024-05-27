import { router } from 'expo-router';
import { FlatList, View } from 'react-native';
import NOTIFICATION from '../../assets/notification.png';
import PreviewMakeupClassSkeleton from '../skeletons/PreviewMakeupClassSkeleton';
import { useMakeupClass } from '../stores/makeup-class.store';
import HeaderButton from './HeaderButton';
import UserMakeupClass from './UserMakeupClass';

export default function PreviewMakeupClass() {
    const { classes, refetch, loading } = useMakeupClass();

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
            {loading || !classes ? (
                <PreviewMakeupClassSkeleton />
            ) : (
                <>
                    <FlatList
                        contentContainerStyle={{
                            flexDirection: 'column',
                            gap: 8,
                        }}
                        scrollEnabled={false}
                        data={classes}
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
