import { TouchableOpacity, View } from "react-native";
import MessageIcon from "../../icons/message";
import NotificationIcon from "../../icons/notification";
import DrawerIcon from "../../icons/drawer";

export default function PageHeader() {
    return (
        <View className=" px-4 py-2 flex flex-row">
            <TouchableOpacity className=" p-1 mr-auto">
                <DrawerIcon />
            </TouchableOpacity>
            <View className=" flex flex-row gap-6">
                <TouchableOpacity className=" p-1">
                    <MessageIcon />
                </TouchableOpacity>
                <TouchableOpacity className=" p-1">
                    <NotificationIcon />
                </TouchableOpacity>
            </View>
        </View>
    );
}
