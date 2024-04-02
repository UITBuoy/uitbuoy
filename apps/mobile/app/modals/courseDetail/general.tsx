import { useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, TouchableNativeFeedback, View } from 'react-native';
import { useGeneralDetailCourseQuery } from '../../../src/gql/graphql';
import NativeButton from '../../../src/components/NativeButton/NativeButton';
import CourseAlert from '../../../src/components/CourseAlert/CourseAlert';
import moment from 'moment';
import { Spinner } from '@gluestack-ui/themed';
import CourseContentAccordion from '../../../src/components/Accordion/CourseContentAccordion';

type Props = {
    id: number;
};

export default function GeneralPage({ id }: Props) {
    const { data, loading, error } = useGeneralDetailCourseQuery({
        variables: { id },
    });

    const hasDeadline = data?.course.events.some(
        (event) =>
            moment(new Date(event.timestart * 1000)).diff(moment(), 'days') > 0,
    );

    const mostRecentDeadline = data?.course.events.reduce(
        (min, event) =>
            moment(new Date(event.timestart * 1000)).diff(moment(), 'days') > 0
                ? Math.min(
                      moment(new Date(event.timestart * 1000)).diff(
                          moment(),
                          'days',
                      ),
                      min,
                  )
                : min,
        Infinity,
    );

    return (
        <ScrollView className="flex-1 bg-white">
            <View className=" py-5 flex flex-col gap-4">
                {loading ? (
                    <View>
                        <Spinner />
                    </View>
                ) : (
                    <>
                        <CourseAlert
                            className=" mx-4 mb-4"
                            hasDeadline={hasDeadline}
                            mostRecentDeadline={mostRecentDeadline}
                        />
                        {data?.course.contacts.map(({ fullname, id }) => (
                            <NativeButton className=" mx-4" key={id}>
                                <View className=" flex flex-col gap-2 p-4 border-[0.5px] rounded-2xl border-neutral-80">
                                    <Text className=" font-medium">
                                        {fullname}
                                    </Text>
                                    <Text className=" ml-auto text-primary-50 items-end font-medium">
                                        Lecturer
                                    </Text>
                                </View>
                            </NativeButton>
                        ))}
                        <Text className=" mx-4 mt-4 font-bold text-lg">
                            Course resource
                        </Text>
                        <View className=" mx-4 mt-2 flex flex-col gap-4">
                            {data?.course.contentSections.map(
                                ({ name, courseModules }) => (
                                    <CourseContentAccordion
                                        key={name}
                                        value={{
                                            name,
                                            contents: courseModules,
                                        }}
                                    />
                                ),
                            )}
                        </View>
                    </>
                )}
            </View>
        </ScrollView>
    );
}
