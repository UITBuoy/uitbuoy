import { Spinner } from '@gluestack-ui/themed';
import { useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import NativeButton from '../../../src/components/NativeButton/NativeButton';
import { useGeneralDetailCourseQuery } from '../../../src/gql/graphql';
import AssignIcon from '../../../src/icons/assign';
import FolderIcon from '../../../src/icons/folder';
import ForumIcon from '../../../src/icons/forum';
import ResourceIcon from '../../../src/icons/resource';

type Props = {
    id: number;
};

export default function ResourcePage({ id }: Props) {
    const { data, loading, error } = useGeneralDetailCourseQuery({
        variables: { id },
    });

    const folders = useMemo(() => {
        const folderList = [];
        data?.course.contentSections.forEach((section) => {
            section.courseModules.forEach((module) => {
                if (module.modname === 'folder') {
                    folderList.push(module);
                }
            });
        });
        return folderList;
    }, [data]);

    return (
        <ScrollView className="flex-1 bg-white">
            <View className=" py-5 flex flex-col gap-4">
                {loading ? (
                    <View>
                        <Spinner />
                    </View>
                ) : (
                    <View className=" mx-4 mt-2 flex flex-col gap-4">
                        {folders.map(
                            ({
                                name,
                                assignDueDate,
                                assignOpenedDate,
                                modname,
                            }) => (
                                <NativeButton className=" mx-4" key={name}>
                                    <View className=" flex flex-row gap-3 p-6 px-4 border-[0.5px] rounded-2xl border-neutral-80">
                                        {modname === 'resouce' ? (
                                            <ResourceIcon />
                                        ) : modname === 'folder' ? (
                                            <FolderIcon />
                                        ) : modname === 'forum' ? (
                                            <ForumIcon />
                                        ) : modname === 'assign' ? (
                                            <AssignIcon />
                                        ) : (
                                            <></>
                                        )}
                                        <View className="flex-1">
                                            <Text className=" font-medium">
                                                {name}
                                            </Text>
                                        </View>
                                    </View>
                                </NativeButton>
                            ),
                        )}
                    </View>
                )}
            </View>
        </ScrollView>
    );
}
