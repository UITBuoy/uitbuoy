import { Spinner } from '@gluestack-ui/themed';
import { View, Text, Image } from 'react-native';
import SUCCESS_ICON from '../../assets/success.png';

type PropTypes = {
    loading: boolean;
    loaded: boolean;
    title: string;
    description: string;
};

export default function ProgressText({
    loaded,
    loading,
    title,
    description,
}: PropTypes) {
    return (
        <View className=" flex flex-row gap-4 p-4 rounded-2xl">
            <View className=" mt-2">
                {loading || !loaded ? (
                    <Spinner size="large" />
                ) : loaded ? (
                    <Image
                        source={SUCCESS_ICON}
                        style={{ width: 32, height: 32 }}
                    />
                ) : null}
            </View>
            <View
                style={{
                    opacity: loaded ? 1 : 0.4,
                }}
                className=" flex flex-col gap-2"
            >
                <Text className=" font-medium text-lg">{title}</Text>
                <Text style={{ paddingRight: 20 }} className=" font-light">
                    {description}
                </Text>
            </View>
        </View>
    );
}
