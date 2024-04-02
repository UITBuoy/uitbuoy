import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useGlobalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import ActitivitiesPage from './activities';
import GeneralPage from './general';
import NoticePage from './notice';
import ResourcePage from './resource';

const Tab = createMaterialTopTabNavigator();

export default function Layout() {
    const navigation = useNavigation();
    const params = useGlobalSearchParams();

    useEffect(() => {
        if (params.display_name) {
            navigation.setOptions({ title: params.display_name });
        }
    }, [params]);

    return (
        <View className=" flex-1">
            <Tab.Navigator
                tabBar={(props) => <MyTabBar {...props} />}
                screenOptions={{
                    tabBarLabelStyle: { fontSize: 14 },
                }}
            >
                <Tab.Screen
                    name="General"
                    children={() => (
                        <GeneralPage id={parseInt(params.id.toString(), 10)} />
                    )}
                />
                <Tab.Screen
                    name="Activities"
                    children={() => (
                        <ActitivitiesPage
                            id={parseInt(params.id.toString(), 10)}
                        />
                    )}
                />
                <Tab.Screen name="Notice" component={NoticePage} />
                <Tab.Screen
                    name="Resource"
                    children={() => (
                        <ResourcePage id={parseInt(params.id.toString(), 10)} />
                    )}
                />
            </Tab.Navigator>
        </View>
    );
}

function MyTabBar({ state, descriptors, navigation, position }) {
    return (
        <View className=" flex flex-row bg-[#039CCA] pt-6 pb-3 px-4 rounded-b-2xl">
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                          ? options.title
                          : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                const inputRange = state.routes.map((_, i) => i);
                const opacity = position.interpolate({
                    inputRange,
                    outputRange: inputRange.map((i) => (i === index ? 1 : 0.7)),
                });

                const backgroundColor = position.interpolate({
                    inputRange,
                    outputRange: inputRange.map((i) =>
                        i === index ? '#ffffff44' : '#ffffff00',
                    ),
                });

                return (
                    <TouchableOpacity
                        key={label}
                        activeOpacity={0.5}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{
                            backgroundColor,
                            flex: 1,
                            paddingVertical: 8,
                            paddingHorizontal: 12,
                            borderRadius: 14,
                        }}
                    >
                        <Animated.Text
                            style={{
                                textAlign: 'center',
                                opacity,
                                color: 'white',
                                fontWeight: '500',
                            }}
                        >
                            {label}
                        </Animated.Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}
