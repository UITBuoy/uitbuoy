import { DeepPartial } from '@apollo/client/utilities';
import { Text, View } from 'react-native';
import { SectionSubject } from '../gql/graphql';
import NativeButton from './NativeButton/NativeButton';

type Props = {
    subject: DeepPartial<SectionSubject>;
};

export default function SubjectItem({ subject }: Props) {
    return (
        <View className=" mx-2">
            <NativeButton>
                <View className=" px-2 py-1">
                    <Text className=" font-medium">{subject.nameVN}</Text>
                    <Text className=" text-neutral-70">{subject.code}</Text>
                </View>
            </NativeButton>
        </View>
    );
}
