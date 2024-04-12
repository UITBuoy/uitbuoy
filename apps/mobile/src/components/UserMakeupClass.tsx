import { DeepPartial } from '@apollo/client/utilities';
import { Image, Text, View } from 'react-native';
import CLOCK_ICON from '../../assets/clock.png';
import HOUSE_ICON from '../../assets/house.png';
import { MakeUpClass } from '../gql/graphql';
import { dateToShortString } from '../utils/dateToString';
import { timeDiff } from '../utils/timeDiff';
import NativeButton from './NativeButton/NativeButton';

export default function UserMakeupClass({
    makeupClass,
}: {
    makeupClass: DeepPartial<MakeUpClass>;
}) {
    const { time, type } = timeDiff(new Date(makeupClass.time));

    return (
        <View className=" px-4">
            <NativeButton>
                <View className=" p-4 bg-primary-95">
                    <View className=" flex-row items-center gap-4">
                        <Text className="p-2 rounded-lg bg-primary-70 font-medium text-sm text-white">{`Còn ${-time} ${type} nữa`}</Text>
                        <Text className=" font-medium text-sm">
                            {dateToShortString(
                                new Date(makeupClass.time),
                                'long',
                            )}
                        </Text>
                    </View>
                    <Text className=" mt-4 text-sm text-zinc-500">
                        {makeupClass.courseCode}
                    </Text>
                    <Text className=" mt-1 font-medium text-lg">
                        {makeupClass.title}
                    </Text>
                    <View className=" mt-4 flex-row gap-4">
                        {makeupClass.classroom ? (
                            <Text
                                style={{ backgroundColor: '#44E187' }}
                                className=" p-2 rounded-lg text-sm font-medium"
                            >
                                {`Phòng ${makeupClass.classroom}`}
                            </Text>
                        ) : null}
                        <Text className=" bg-primary-70 text-white p-2 rounded-lg text-sm font-medium">
                            {`Từ tiết ${makeupClass.start} đến tiết ${makeupClass.end}`}
                        </Text>
                    </View>
                </View>
            </NativeButton>
        </View>
    );
}
