import { TouchableNativeFeedback, View } from 'react-native';

export default function NativeButton({
    className,
    children,
    onPress,
    opacity = 1,
    borderRadius = 12,
}: React.ComponentProps<typeof View> &
    React.ComponentProps<typeof TouchableNativeFeedback> & {
        borderRadius?: number;
        opacity?: any;
    }) {
    return (
        <View
            className={`${className} overflow-hidden`}
            style={{ borderRadius, overflow: 'hidden', opacity }}
        >
            <TouchableNativeFeedback
                onPress={onPress}
                background={TouchableNativeFeedback.Ripple('#aaa', true)}
            >
                {children}
            </TouchableNativeFeedback>
        </View>
    );
}
