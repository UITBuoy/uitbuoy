import { TouchableNativeFeedback, View } from 'react-native';

export default function NativeButton({
    className,
    children,
    borderRadius = 12,
}: React.ComponentProps<typeof View> &
    React.ComponentProps<typeof TouchableNativeFeedback> & {
        borderRadius?: number;
    }) {
    return (
        <View
            className={`${className} overflow-hidden`}
            style={{ borderRadius, overflow: 'hidden' }}
        >
            <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('#aaa', true)}
            >
                {children}
            </TouchableNativeFeedback>
        </View>
    );
}
