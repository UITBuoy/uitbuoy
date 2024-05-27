import { DeepPartial } from '@apollo/client/utilities';
import { Text, View } from 'react-native';
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
        <View className="">
            <NativeButton borderRadius={0}>
                <View
                    style={{ backgroundColor: '#EDF4FA' }}
                    className=" p-4 bg-primary-99"
                >
                    <View className=" flex-row items-center gap-4">
                        <Text className="p-2 rounded-lg bg-primary-70 font-medium text-sm text-white">{`Còn ${-time} ${type} nữa`}</Text>
                        <Text className=" font-medium text-sm">
                            {dateToShortString(
                                new Date(makeupClass.time),
                                'full',
                            )}
                        </Text>
                    </View>
                    <Text className=" mt-4 font-medium text-lg">
                        {makeupClass.title}
                    </Text>
                    <View
                        style={{ marginTop: 16 }}
                        className=" rounded-lg flex-row justify-between items-center gap-2"
                    >
                        {makeupClass.classroom ? (
                            <Text className=" rounded-lg text-sm text-primary-60 font-bold">
                                {`Phòng ${makeupClass.classroom}`}
                            </Text>
                        ) : null}
                        <Text className=" rounded-lg text-sm text-primary-60 font-bold">
                            {`Từ tiết ${makeupClass.start} đến tiết ${makeupClass.end}`}
                        </Text>
                    </View>
                </View>
            </NativeButton>
        </View>
    );
}
