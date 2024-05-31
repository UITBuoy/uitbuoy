import { Text, View } from 'react-native';
import { Message } from '../gql/graphql';

type Props = {
    message: Message;
};

export default function MessageItem({ message }: Props) {
    return (
        <View>
            <Text>{message.content}</Text>
        </View>
    );
}
