import { DeepPartial } from '@apollo/client/utilities';
import { Text, View } from 'react-native';
import { SectionSubject } from '../gql/graphql';
import NativeButton from './NativeButton/NativeButton';

type Props = {
    subject: DeepPartial<SectionSubject>;
};

export default function SubjectItem({ subject }: Props) {
    return (
        <View className="border-[0.5px]" style={{ borderColor: '#CFCFCF' }}>
            <NativeButton borderRadius={0}>
                <View className=" px-4 py-2">
                    <Text className=" font-medium">{subject.nameVN}</Text>
                    <Text className=" text-neutral-70">{subject.code}</Text>
                </View>
            </NativeButton>
        </View>
    );
}
