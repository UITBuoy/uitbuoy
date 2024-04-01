import { ScrollView, Text, View } from 'react-native';
import { useGeneralDetailCourseQuery } from '../../../src/gql/graphql';
import { Spinner } from '@gluestack-ui/themed';
import NativeButton from '../../../src/components/NativeButton/NativeButton';
import ResourceIcon from '../../../src/icons/resource';
import FolderIcon from '../../../src/icons/folder';
import ForumIcon from '../../../src/icons/forum';
import AssignIcon from '../../../src/icons/assign';

type Props = {
    id: number;
};

export default function ActitivitiesPage({ id }: Props) {
    const { data, loading, error } = useGeneralDetailCourseQuery({
        variables: { id },
    });
    console.log(data);

    return (
        <ScrollView className="flex-1 bg-white">
            <View className=" py-5 flex flex-col gap-4">
                {loading ? (
                    <View>
                        <Spinner />
                    </View>
                ) : (
                    <>
                        {data?.course.events.map(
                            ({
                                activityname,
                                modulename,
                                description,
                                timestart,
                            }) => (
                                <NativeButton
                                    className=" mx-4"
                                    key={activityname}
                                >
                                    <View className=" flex flex-row gap-3 p-6 px-4 border-[0.5px] rounded-2xl border-neutral-80">
                                        {modulename === 'resouce' ? (
                                            <ResourceIcon />
                                        ) : modulename === 'folder' ? (
                                            <FolderIcon />
                                        ) : modulename === 'forum' ? (
                                            <ForumIcon />
                                        ) : modulename === 'assign' ? (
                                            <AssignIcon />
                                        ) : (
                                            <></>
                                        )}
                                        <View className="flex-1">
                                            <Text className=" font-medium">
                                                {activityname}
                                            </Text>
                                            <Text className=" mt-2 font-light">
                                                {new Intl.DateTimeFormat(
                                                    'vi-VN',
                                                    {
                                                        dateStyle: 'full',
                                                        timeStyle: 'short',
                                                        timeZone:
                                                            'Asia/Ho_Chi_Minh',
                                                    },
                                                ).format(
                                                    new Date(timestart * 1000),
                                                )}
                                            </Text>
                                        </View>
                                    </View>
                                </NativeButton>
                            ),
                        )}
                    </>
                )}
            </View>
        </ScrollView>
    );
}
