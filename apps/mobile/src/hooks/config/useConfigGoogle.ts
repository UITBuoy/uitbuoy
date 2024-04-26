import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useEffect } from 'react';

export function useConfigGoogle() {
    useEffect(() => {
        GoogleSignin.configure({
            webClientId:
                '683520066916-c8afnsf4lstvc2dnt43qgusqm2olmiko.apps.googleusercontent.com',
            scopes: [
                'profile',
                'email',
                'https://www.googleapis.com/auth/calendar',
                'https://www.googleapis.com/auth/tasks',
            ],
            offlineAccess: true,
        });
    }, []);
}
