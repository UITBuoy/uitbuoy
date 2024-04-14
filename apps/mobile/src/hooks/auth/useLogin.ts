import { useCallback } from 'react';
import { useLoginApiMutation } from '../../gql/graphql';
import { useAuth } from '../../stores/auth.store';

export function useLogin() {
    const [loginFunction, { data, loading, error }] = useLoginApiMutation();
    const { authLogin } = useAuth();

    const login = useCallback(
        async (username: string, password: string): Promise<boolean> => {
            try {
                const authEntityResponse = await loginFunction({
                    variables: { username, password },
                });
                console.log({ authEntityResponse });
                //@ts-ignore
                return authLogin(authEntityResponse.data.login);
            } catch (error) {
                console.log({ error });
            }
        },
        [],
    );

    return { login, data, loading, error };
}
