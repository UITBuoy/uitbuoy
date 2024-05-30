import { DeepPartial } from '@apollo/client/utilities';
import { Text, View } from 'react-native';
import { SectionSubject } from '../gql/graphql';
import NativeButton from './NativeButton/NativeButton';
import Chip from './Chip';
import { useSubjectSelection } from '../stores/subject-selection.store';

type Props = {
    subject: DeepPartial<SectionSubject>;
    onPress?: () => any;
};

export default function SelectionSubjectItem({ subject, onPress }: Props) {
    const { subjects, addSubject, removeSubject } = useSubjectSelection();
    const isSelected = subjects.some((s) => s.code === subject.code);

    return (
        <View
            className="border-[0.5px]"
            style={{
                borderColor: '#CFCFCF',
                backgroundColor: isSelected ? '#6BD2FF' : 'white',
            }}
        >
            <NativeButton
                onPress={() =>
                    isSelected
                        ? removeSubject(subject.code)
                        : addSubject(subject)
                }
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
