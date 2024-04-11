import { useCallback } from 'react';
import { useSyncEventMutation } from '../../gql/graphql';
import { useGoogleSignin } from '../google/useGoogleSignin';
import { useAuth } from '../../stores/auth.store';

export function useSyncEvent() {
    const { isIntegrateWithGoogle } = useAuth();
    const { getProfile } = useGoogleSignin();
    const [syncEventMutation] = useSyncEventMutation();

    const syncEvent = useCallback(async () => {
        if (!isIntegrateWithGoogle) return;
        const { token, user } = await getProfile();
        syncEventMutation({
            variables: {
                accessToken: token.accessToken,
                googleUserId: user.id,
            },
        });
    }, []);

    return { syncEvent };
}
