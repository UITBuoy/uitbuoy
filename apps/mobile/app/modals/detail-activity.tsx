import { Spinner } from '@gluestack-ui/themed';
import { useGlobalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDetailAssignmentCourseQuery } from '../../src/gql/graphql';
import AssignIcon from '../../src/icons/assign';

export default function DetailActivity() {
    // const params = useGlobalSearchParams<{
    //     course_id: string;
    //     assignment_id: string;
    // }>();

    // const { data, loading, error } = useDetailAssignmentCourseQuery({
    //     variables: {
    //         id: parseInt(params.course_id, 10),
    //         assignment_id: parseInt(params.assignment_id, 10),
    //     },
    // });

    // const assignment = data?.course?.assignment;

    // console.log({ params, data, loading, error });

    return (
        <View className=" flex-1 bg-white">
            <SafeAreaView style={{ flex: 1 }}>
                {/* {loading && !assignment ? (
                    <Spinner />
                ) : (
                    <View className=" px-4 py-6">
                        <View className=" flex flex-row gap-4">
                            <AssignIcon />
                            <Text>{assignment.name}</Text>
                        </View>
                    </View>
                )} */}
            </SafeAreaView>
        </View>
    );
}
