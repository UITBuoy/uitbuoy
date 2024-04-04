import { useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import NativeButton from '../../src/components/NativeButton/NativeButton';
import { useViewFile } from '../../src/hooks/file/useViewFile';
import { useDetailFolderRouter } from '../../src/stores/folder-detail.store';

export default function DetailActivity() {
    const navigation = useNavigation();

    const { folder } = useDetailFolderRouter();
    const viewFile = useViewFile();

    useEffect(() => {
        navigation.setOptions({ title: folder.name });
    }, []);

    return (
        <View className=" flex-1 bg-white pt-5">
            <FlatList
                contentContainerStyle={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                    marginTop: 16,
                }}
                data={folder.courseContents}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                    <NativeButton
                        key={item.filename}
                        onPress={() =>
                            item.fileurl
                                ? viewFile({ fileurl: item.fileurl })
                                : null
                        }
                        className=" mx-4"
                    >
                        <View className=" flex flex-col gap-1 p-3 border-[0.5px] rounded-2xl border-neutral-80">
                            <Text className=" font-medium">
                                {item.filename}
                            </Text>
                            <Text className=" font-light text-sm">
                                {(parseInt(item.filesize) / 1000).toFixed(1)} kB
                            </Text>
                        </View>
                    </NativeButton>
                )}
            />
        </View>
    );
}
