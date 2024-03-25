import React, { ReactNode } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { View } from 'react-native';
import HomeIcon from '../../src/icons/home';
import CourseIcon from '../../src/icons/course';
import ScheduleIcon from '../../src/icons/schedule';
import ProfileIcon from '../../src/icons/profile';
import LearningPathIcon from '../../src/icons/learning-path';
// import HomeIcon from '../../assets/icons/home.png';
// import { Image } from 'expo-image';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: 'blue',
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: 80,
                    backgroundColor: '#ffffff99',
                    borderTopWidth: 0,
                    position: 'absolute',
                    width: 'auto',
                    shadowColor: 'transparent',
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon focused={focused}>
                            <HomeIcon focused={focused} />
                        </TabIcon>
                    ),
                }}
            />
            <Tabs.Screen
                name="courses"
                options={{
                    title: 'Courses',
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused}>
                            <CourseIcon focused={focused} />
                        </TabIcon>
                    ),
                }}
            />
            <Tabs.Screen
                name="learning-path"
                options={{
                    title: 'Learning path',
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused}>
                            <LearningPathIcon focused={focused} />
                        </TabIcon>
                    ),
                }}
            />
            <Tabs.Screen
                name="schedule"
                options={{
                    title: 'Schedule',
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused}>
                            <ScheduleIcon focused={focused} />
                        </TabIcon>
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused}>
                            <ProfileIcon focused={focused} />
                        </TabIcon>
                    ),
                }}
            />
        </Tabs>
    );
}

function TabIcon({
    name,
    focused,
    children,
}: Partial<React.ComponentProps<typeof FontAwesome>> & {
    focused: boolean;
    children?: ReactNode;
}) {
    return (
        <View
            className={`p-3 rounded-xl h-fit ${focused ? ' bg-[#E1F4FF]' : ''}`}
        >
            {name ? (
                <FontAwesome
                    size={28}
                    name={name}
                    color={focused ? '#3FB7E6' : '#CFCFCF'}
                />
            ) : (
                children
            )}
        </View>
    );
}
