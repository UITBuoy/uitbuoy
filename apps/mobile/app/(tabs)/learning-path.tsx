import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProfileQuery } from '../../src/gql/graphql';
import NativeButton from '../../src/components/NativeButton/NativeButton';
import EducationProgram from '../../src/components/EducationProgram';
import Chevron from '../../src/components/Accordion/Chevron';
import ChevronIcon from '../../src/icons/chevron';

export default function Page() {
    const { data, loading, error } = useProfileQuery();

    return (
        <View className=" bg-white flex-1 w-full">
            <SafeAreaView style={{ flex: 1 }}>
                {loading ? (
                    <></>
                ) : (
                    <View style={{ flex: 1, paddingBottom: 80 }}>
                        <View className=" m-2 rounded-xl ">
                            <NativeButton>
                                <View className=" p-2">
                                    <Text className=" text-neutral-40">
                                        Chương trình đào tạo
                                    </Text>
                                    <View className=" flex-row items-center gap-2">
                                        <Text className=" mt-1 text-lg font-semibold ">
                                            {data.profile.majorName} -
                                        </Text>
                                        <Text className=" rounded-lg bg-primary-70 px-2 py-1 mt-1 font-semibold text-white">
                                            {`Khóa ${parseInt(data.profile.year) - 5}`}
                                        </Text>
                                    </View>
                                </View>
                            </NativeButton>
                        </View>
                        <View className=" m-2 rounded-lg ">
                            <NativeButton borderRadius={8}>
                                <View className=" p-2 bg-primary-70 flex-row justify-between">
                                    <Text className="font-medium text-white">
                                        Gợi ý lộ trình học
                                    </Text>
                                    <View
                                        style={{ transform: 'rotate(-90deg)' }}
                                    >
                                        <ChevronIcon color="white" />
                                    </View>
                                </View>
                            </NativeButton>
                        </View>
                        <EducationProgram />
                    </View>
                )}
            </SafeAreaView>
        </View>
    );
}
