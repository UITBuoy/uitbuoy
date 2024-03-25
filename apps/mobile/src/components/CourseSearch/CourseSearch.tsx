import { TouchableNativeFeedback, View } from 'react-native';
import TextField from '../TextField/TextField';
import SearchIcon from '../../icons/search';
import { router } from 'expo-router';

export default function CourseSearch() {
    return (
        <TouchableNativeFeedback
            onPress={() => {
                router.push('/modals/courseSearch');
            }}
        >
            <View className=" rounded-2xl mt-4 mx-4 px-4 py-3 bg-[#F2F2F2] flex flex-row gap-4 items-center">
                <SearchIcon />
                <TextField
                    editable={false}
                    fieldClassName=" text-sm"
                    title="Search"
                    type="text"
                    placeholder="Search for courses..."
                />
            </View>
        </TouchableNativeFeedback>
    );
}
