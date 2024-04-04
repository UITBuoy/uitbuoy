import * as FileSystem from 'expo-file-system';
import { useAuth } from '../../stores/auth.store';

export function useSaveFile() {
    const { authData } = useAuth();

    async function saveFile(file: { fileurl: string; mimetype: string }) {
        const fileurl = file.fileurl
            .split('?')
            .slice(0, file.fileurl.split('?').length - 1)
            .join('');
        const mimetype = file.mimetype || 'application/pdf';

        if (!fileurl) return;

        const filename = fileurl.split('/').at(-1);
        const fileUri = FileSystem.documentDirectory + `${filename}`;

        const downloadResumable = FileSystem.createDownloadResumable(
            `${fileurl}?token=${authData.token}`,
            fileUri,
            {},
        );

        try {
            const { uri } = await downloadResumable.downloadAsync();

            const permissions =
                await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
            if (!permissions.granted) {
                return;
            }

            const base64 =
                await FileSystem.StorageAccessFramework.readAsStringAsync(uri, {
                    encoding: FileSystem.EncodingType.Base64,
                });

            await FileSystem.StorageAccessFramework.createFileAsync(
                permissions.directoryUri,
                filename,
                mimetype,
            ).then(async (uri) => {
                await FileSystem.writeAsStringAsync(uri, base64, {
                    encoding: FileSystem.EncodingType.Base64,
                });
            });
        } catch (e) {
            console.error(e);
        }
    }

    return saveFile;
}
