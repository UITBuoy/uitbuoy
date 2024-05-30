import { useNavigation } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import SubjectAccordion from '../../src/components/Accordion/SubjectAccordion';
import { useSubjectQuery } from '../../src/gql/graphql';
import { useDetailSubjectRouter } from '../../src/stores/subject-detail.store';

export default function DetailActivity() {
    const navigation = useNavigation();

    const { subject: defaultSubject } = useDetailSubjectRouter();

    const { data, loading, refetch } = useSubjectQuery({
        variables: { code: defaultSubject.code },
        fetchPolicy: 'no-cache',
    });

    const subject = useMemo(() => data?.subject || defaultSubject, [loading]);

    useEffect(() => {
        navigation.setOptions({ title: defaultSubject.nameVN });
    }, []);

    return (
        <View className=" flex-1 bg-white pt-0">
            <ScrollView style={{ flex: 1 }}>
                <View className=" px-4">
                    <View className=" mt-4 flex-row justify-center items-center gap-10">
                        <View className=" flex-col items-center rounded-xl bg-primary-70 px-4 py-2">
                            <Text className=" font-bold text-4xl text-white">
                                {subject.theoreticalCredit}
                            </Text>
                            <Text className=" font-medium text-white">
                                Tín chỉ lý thuyết
                            </Text>
                        </View>
                        <View className=" flex-col items-center">
                            <Text className=" font-bold text-4xl">
                                {subject.practicalCredit}
                            </Text>
                            <Text className=" text-neutral-40 font-medium">
                                Tín chỉ thực hành
                            </Text>
                        </View>
                    </View>
                    <View className=" mt-6 flex flex-col gap-1">
                        <Text className=" text-neutral-40">Tên tiếng anh</Text>
                        <Text className=" font-semibold text-lg">
                            {subject.nameEN}
                        </Text>
                    </View>
                    <View className=" mt-4 flex flex-col gap-1">
                        <Text className=" ">{subject.summary}</Text>
                    </View>
                    <View className=" mt-4">
                        <SubjectAccordion
                            name="Môn học trước"
                            subjects={subject.previousSubjects}
                        />
                        <SubjectAccordion
                            name="Môn học tiên quyết"
                            subjects={subject.requiredSubjects}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
