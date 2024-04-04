import { Spinner } from '@gluestack-ui/themed';
import { useGlobalSearchParams } from 'expo-router';
import React from 'react';
import {
    Platform,
    ScrollView,
    Text,
    useWindowDimensions,
    View,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import NativeButton from '../../src/components/NativeButton/NativeButton';
import {
    IntroFile,
    useDetailAssignmentCourseQuery,
} from '../../src/gql/graphql';
import AssignIcon from '../../src/icons/assign';
import { useAuth } from '../../src/stores/auth.store';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';

export default function DetailActivity() {
    const { width } = useWindowDimensions();
    const { authData } = useAuth();

    const params = useGlobalSearchParams<{
        course_id: string;
        assignment_id: string;
    }>();

    const { data, loading, error } = useDetailAssignmentCourseQuery({
        variables: {
            id: parseInt(params.course_id, 10),
            assignment_id: parseInt(params.assignment_id, 10),
        },
    });

    const assignment = data?.assignmentCourse?.assignment;

    async function downloadFile(file: IntroFile) {
        const filename = file.fileurl.split('/').at(-1);
        const fileUri = FileSystem.documentDirectory + `${filename}`;

        const downloadResumable = FileSystem.createDownloadResumable(
            `${file.fileurl}?token=${authData.token}`,
            fileUri,
            {},
        );

        try {
            const { uri } = await downloadResumable.downloadAsync();

            // const permissions =
            //     await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
            // if (!permissions.granted) {
            //     return;
            // }

            // const base64 =
            //     await FileSystem.StorageAccessFramework.readAsStringAsync(uri, {
            //         encoding: FileSystem.EncodingType.Base64,
            //     });
            // const fileUri =
            //     await FileSystem.StorageAccessFramework.createFileAsync(
            //         permissions.directoryUri,
            //         filename,
            //         file.mimetype,
            //     ).then(async (uri) => {
            //         await FileSystem.writeAsStringAsync(uri, base64, {
            //             encoding: FileSystem.EncodingType.Base64,
            //         });
            //     });

            // console.log('Finished downloading to ', fileUri);

            FileSystem.getContentUriAsync(uri).then((cUri) => {
                if (Platform.OS === 'ios') {
                    // Sharing.shareAsync(cUri.uri);
                } else {
                    IntentLauncher.startActivityAsync(
                        'android.intent.action.VIEW',
                        {
                            data: cUri,
                            flags: 1,
                            type: file.mimetype,
                        },
                    );
                }
            });
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <View className=" flex-1 bg-white pt-10">
            {loading && !assignment ? (
                <Spinner />
            ) : (
                <View className=" flex-1">
                    <ScrollView className=" flex-1">
                        <View className=" flex-1 flex-col gap-6">
                            <View className=" px-4 w-full flex-row gap-6">
                                <View className=" pt-2">
                                    <AssignIcon scale={1.5} />
                                </View>
                                <Text className=" flex-1 text-xl font-medium">
                                    {assignment.name}
                                </Text>
                            </View>
                            <View className=" mt-4 flex-col gap-4 bg-neutral-99 p-4">
                                <View className=" flex-row items-center gap-4">
                                    <Text className=" w-[80px] p-1 rounded-lg text-center bg-[#71eda7] text-black font-medium">
                                        Opened
                                    </Text>
                                    <Text className=" font-medium">
                                        {new Intl.DateTimeFormat('vi-VN', {
                                            dateStyle: 'full',
                                            timeStyle: 'short',
                                            timeZone: 'Asia/Ho_Chi_Minh',
                                        }).format(
                                            new Date(
                                                assignment.allowsubmissionsfromdate *
                                                    1000,
                                            ),
                                        )}
                                    </Text>
                                </View>
                                <View className=" flex-row items-center gap-4">
                                    <Text className=" w-[80px] p-1 rounded-lg text-center bg-[#fd6969] text-white font-medium">
                                        Due
                                    </Text>
                                    <Text className=" font-medium">
                                        {new Intl.DateTimeFormat('vi-VN', {
                                            dateStyle: 'full',
                                            timeStyle: 'short',
                                            timeZone: 'Asia/Ho_Chi_Minh',
                                        }).format(
                                            new Date(assignment.duedate * 1000),
                                        )}
                                    </Text>
                                </View>
                                <View className=" mt-2 mb-2 border-b-neutral-50 border-b-[0.5px]" />
                                <View className="">
                                    <RenderHtml
                                        contentWidth={width - 50}
                                        baseStyle={{
                                            padding: 0,
                                            marginVertical: 0,
                                        }}
                                        tagsStyles={{
                                            img: { padding: 0, margin: 10 },
                                            p: { padding: 0, margin: 0 },
                                        }}
                                        source={{
                                            html: assignment.intro.replace(
                                                /src="(.*?)"/g,
                                                `src="$1?token=${authData.token}"`,
                                            ),
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                        <View className=" w-full mt-4 mx-4 flex-row flex-wrap">
                            {[
                                ...assignment.introfiles,
                                ...assignment.introattachments,
                            ].map((file) => (
                                <NativeButton
                                    key={file.filename}
                                    borderRadius={6}
                                    className=" m-2"
                                    onPress={() => downloadFile(file)}
                                >
                                    <View className=" self-start py-1 px-3 border-[1px] border-primary-60 rounded-lg">
                                        <Text className=" w-fit text-primary-60">
                                            {file.filename}
                                        </Text>
                                    </View>
                                </NativeButton>
                            ))}
                        </View>
                    </ScrollView>
                    <View className=" mt-auto px-4 pb-10 pt-6 flex-row gap-4">
                        <NativeButton className=" flex-1">
                            <View className=" p-3 border-[1px] border-primary-60 rounded-2xl flex-col items-center">
                                <Text className=" font-semibold text-primary-60">
                                    Upload
                                </Text>
                            </View>
                        </NativeButton>
                        <NativeButton className=" flex-1">
                            <View className=" p-3 bg-primary-60 rounded-2xl flex-col items-center">
                                <Text className=" font-semibold text-white">
                                    Submit
                                </Text>
                            </View>
                        </NativeButton>
                    </View>
                </View>
            )}
        </View>
    );
}
