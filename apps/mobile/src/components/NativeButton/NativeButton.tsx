import { TouchableNativeFeedback, View } from 'react-native';

export default function NativeButton({
    className,
    children,
}: React.ComponentProps<typeof View>) {
    return (
        <View
            className={`${className} overflow-hidden`}
            style={{ borderRadius: 12, overflow: 'hidden' }}
        >
            <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('#aaa', true)}
            >
                {children}
            </TouchableNativeFeedback>
        </View>
    );
}
