import { Redirect, Slot } from 'expo-router';
import { useAuth } from '../../src/stores/auth.store';

export default function Layout() {
    const { isLogin } = useAuth();

    if (!isLogin) return <Redirect href={'/login'} />;

    return <Slot></Slot>;
}
