import { Spinner } from '@gluestack-ui/themed';
import { useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import NativeButton from '../../../src/components/NativeButton/NativeButton';
import { useGeneralDetailCourseQuery } from '../../../src/gql/graphql';
import AssignIcon from '../../../src/icons/assign';
import FolderIcon from '../../../src/icons/folder';
import ForumIcon from '../../../src/icons/forum';
import ResourceIcon from '../../../src/icons/resource';
import { router } from 'expo-router';
import { useDetailFolderRouter } from '../../../src/stores/folder-detail.store';
import UrlIcon from '../../../src/icons/url';
import LabelIcon from '../../../src/icons/label';

type Props = {
    id: number;
};

export default function ResourcePage({ id }: Props) {
    const { navigateFolder } = useDetailFolderRouter();

    const { data, loading, error } = useGeneralDetailCourseQuery({
        variables: { id },
    });

    const folders = useMemo(() => {
        const folderList = [];
        data?.course.contentSections.forEach((section) => {
            section.courseModules.forEach((module) => {
                if (module.modname !== 'forum' && module.modname !== 'assign') {
                    folderList.push(module);
                }
            });
        });
        return folderList;
    }, [data]);

    console.log(folders);

    return (
        <ScrollView className="flex-1 bg-white">
            <View className=" py-5 flex flex-col gap-4">
                {loading ? (
                    <View>
                        <Spinner />
                    </View>
                ) : (
                    <View className=" mx-4 mt-2 flex flex-col gap-4">
                        {folders.map(({ name, modname }, i) => (
                            <NativeButton
                                className=""
                                key={name}
                                onPress={() => navigateFolder(folders[i])}
                            >
                                <View className=" flex flex-row gap-3 p-4 border-[0.5px] rounded-2xl border-neutral-80">
                                    {modname === 'resource' ? (
                                        <ResourceIcon />
                                    ) : modname === 'folder' ? (
                                        <FolderIcon />
                                    ) : modname === 'forum' ? (
                                        <ForumIcon />
                                    ) : modname === 'url' ? (
                                        <UrlIcon />
                                    ) : modname === 'label' ? (
                                        <LabelIcon />
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
                        ))}
                    </View>
                )}
            </View>
        </ScrollView>
    );
}
