import React, { useEffect } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import VIBRATION_ICON from '../../assets/settings/vibration.png';
import SOUND_ICON from '../../assets/settings/sound.png';
import NOT_DISMISSIBLE_ICON from '../../assets/settings/not-dismissible.png';
import DISMISSIBLE_ICON from '../../assets/settings/dismissible.png';
import NOTIFY_BEGIN_OF_DAY_ICON from '../../assets/settings/notify-begin-day.png';
import { useNotificationConfig } from '../../src/stores/notification-config';
import LargeIllustrationSelector from '../../src/components/LargeIllustrationSelector';
import HorizontalIllustrationSelector from '../../src/components/HorizontalIllustrationSelector';

export default function NotificationConfig() {
    const {
        isVibration,
        setVibration,
        isDimissible,
        setDismissible,
        isNotifyAtTheBeginingOfDay,
        setIsNotifyAtTheBeginingOfDay,
        timeBefore,
        setTimeBefore,
    } = useNotificationConfig();

    useEffect(() => {}, []);

    return (
        <View className=" flex-1 bg-white pt-4">
            <ScrollView className=" flex-1 pt-4">
                <View className=" flex mx-4">
                    <Text className=" text-lg font-medium">
                        Cài đặt rung thông báo
                    </Text>
                    <View className=" mt-5 flex-row gap-4">
                        <LargeIllustrationSelector
                            source={VIBRATION_ICON}
                            title="Rung"
                            description="Rung khi có thông báo mới xuất hiện"
                            isSelected={isVibration}
                            onPress={() => setVibration(true)}
                        />
                        <LargeIllustrationSelector
                            source={SOUND_ICON}
                            title="Âm thanh"
                            description="Bật chuông thông báo khi có thông báo mới xuất hiện"
                            isSelected={!isVibration}
                            onPress={() => setVibration(false)}
                        />
                    </View>
                </View>
                <View className=" flex mx-4 mt-10">
                    <Text className=" text-lg font-medium">
                        Cài đặt bỏ qua thông báo
                    </Text>
                    <Text className=" mt-1 text-sm font-light">
                        Bạn có thể chọn không thể bỏ qua thông báo để đảm bảo
                        các lời nhắc nộp bài sẽ luôn được hiển thị cho đến khi
                        bạn đã hoàn thành bài tập
                    </Text>
                    <View className=" mt-5 flex-col gap-4">
                        <HorizontalIllustrationSelector
                            source={NOT_DISMISSIBLE_ICON}
                            title="Không thể bỏ qua"
                            description="Đảm bảo mọi bài tập sẽ luôn được hoàn thành"
                            isSelected={isDimissible}
                            onPress={() => setDismissible(true)}
                        />
                        <HorizontalIllustrationSelector
                            source={DISMISSIBLE_ICON}
                            title="Có thể bỏ qua"
                            description="Bạn có thể lướt để bỏ qua tin nhắn, điều này có thể khiến bạn vô tình bỏ lỡ hạn nộp bài"
                            isSelected={!isDimissible}
                            onPress={() => setDismissible(false)}
                        />
                    </View>
                </View>
                <View className=" flex mx-4 mt-10">
                    <Text className=" text-lg font-medium">
                        Thông báo vào đầu mỗi buổi sáng
                    </Text>
                    <Text className=" mt-1 text-sm font-light">
                        Thông báo về các bài tập cần nộp vào mỗi buổi sáng, giúp
                        bạn không bỏ lỡ bài tập
                    </Text>
                    <View className=" mt-5 flex-col gap-4">
                        <HorizontalIllustrationSelector
                            source={NOTIFY_BEGIN_OF_DAY_ICON}
                            title="Thông báo vào đầu ngày"
                            description="Đảm bảo mọi bài tập sẽ luôn được hoàn thành"
                            isSelected={isNotifyAtTheBeginingOfDay}
                            onPress={() =>
                                setIsNotifyAtTheBeginingOfDay(
                                    !isNotifyAtTheBeginingOfDay,
                                )
                            }
                        />
                    </View>
                </View>
                <View className=" flex-1 mx-4 mt-10">
                    <Text className=" text-lg font-medium">
                        Thông báo trước giờ nộp bài
                    </Text>
                    <Text className=" mt-1 text-sm font-light">
                        Thông báo từ sớm giúp bạn có nhiều thời gian hơn để hoàn
                        thành bài tập về nhà (Đơn vị là tiếng)
                    </Text>
                    <View className=" flex-1 flex-col gap-2">
                        <View className="  flex-1 mt-5 flex-row items-center gap-4">
                            <Text className=" mt-1 font-light">
                                Thông báo trước
                            </Text>
                            <TextInput
                                style={{
                                    width: 60,
                                    borderWidth: 0.5,
                                    padding: 10,
                                }}
                                className=" rounded-2xl text-center text-2xl font-semibold"
                                value={timeBefore.toString()}
                                onChangeText={(text) =>
                                    setTimeBefore(parseInt(text || '0', 10))
                                }
                                keyboardType={'numeric'}
                            />
                            <Text className=" mt-1 font-light">tiếng</Text>
                        </View>
                        {/* <Text className=" mt-1 font-light">
                            trước khi đến hạn nộp bài
                        </Text> */}
                    </View>
                </View>
                <View className=" h-10" style={{ height: 80 }} />
            </ScrollView>
        </View>
    );
}

const TIME_BEFORE_SETTING_TYPE = {
    HOUR: 'h',
    DAY: 'd',
    WEEK: 'w',
    MONTH: 'm',
};
