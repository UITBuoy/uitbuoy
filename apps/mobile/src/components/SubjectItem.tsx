import { DeepPartial } from '@apollo/client/utilities';
import { Text, View } from 'react-native';
import { SectionSubject } from '../gql/graphql';
import NativeButton from './NativeButton/NativeButton';
import Chip from './Chip';
import { useDetailSubjectRouter } from '../stores/subject-detail.store';

type Props = {
    subject: DeepPartial<SectionSubject>;
    onPress?: () => any;
};

export default function SubjectItem({ subject, onPress }: Props) {
    const { navigateSubject } = useDetailSubjectRouter();

    return (
        <View
            className="border-[0.5px]"
            style={{
                borderColor: '#CFCFCF',
                opacity: subject.isLearned ? 0.3 : 1,
            }}
        >
            <NativeButton
                onPress={() => navigateSubject(subject)}
                borderRadius={0}
            >
                <View className=" px-4 py-2 flex-row justify-between items-start">
                    <View
                        className=" flex-1 flex-col gap-1"
                        style={{ paddingRight: 8 }}
                    >
                        <Text className=" font-medium">{subject.nameVN}</Text>
                        <Text className=" text-neutral-40">{subject.code}</Text>
                    </View>
                    <View className=" flex-row gap-2">
                        {subject.isLearned ? (
                            <Text className=" font-medium px-2">Đã học</Text>
                        ) : (
                            <Chip>
                                {`${
                                    subject.theoreticalCredit +
                                    subject.practicalCredit
                                } tín chỉ`}
                            </Chip>
                        )}
                    </View>
                </View>
            </NativeButton>
        </View>
    );
}
