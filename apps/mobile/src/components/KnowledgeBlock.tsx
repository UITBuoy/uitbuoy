import { Text, View } from 'react-native';
import { Section } from '../gql/graphql';
import { DeepPartial } from '@apollo/client/utilities';
import NativeButton from './NativeButton/NativeButton';
import { capitalizeFirstLetter } from '../utils/stringTransfrom';
import Chip from './Chip';

type Props = {
    section: DeepPartial<Section>;
};

export default function KnowledgeBlock({ section }: Props) {
    return (
        <View
            className=" border-[0.5px] rounded-xl"
            style={{
                marginBottom: 8,
                // borderTopWidth: 7,
                // borderTopColor: '#3FB7E6',
                borderTopColor: '#CFCFCF',
                borderRightColor: '#CFCFCF',
                borderLeftColor: '#CFCFCF',
                borderBottomColor: '#CFCFCF',
            }}
        >
            <NativeButton>
                <View className=" p-2">
                    <Text className=" text-lg font-medium">
                        {capitalizeFirstLetter(section.name)}
                    </Text>
                    <View className=" mt-2 flex-row gap-2">
                        <Chip>{`${section.totalCredit || 0} tín chỉ`}</Chip>
                        <Chip
                            style={{ backgroundColor: '#44E187' }}
                        >{`${section.subjects.length || 0} môn học`}</Chip>
                    </View>
                </View>
            </NativeButton>
        </View>
    );
}
