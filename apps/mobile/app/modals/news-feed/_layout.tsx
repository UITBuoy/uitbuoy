import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Animated, ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NewsFeed from '../../../src/components/NewsFeed';

const Tab = createMaterialTopTabNavigator();

export default function Layout() {
    const tags = [
        'Thông báo chung',
        'Tuyển dụng',
        'Sự kiện',
        'Kỹ thuật phần mềm',
        'Khoa học - Công nghệ',
    ];

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View className=" flex-1">
                <Tab.Navigator
                    tabBar={(props) => <MyTabBar {...props} />}
                    screenOptions={{
                        tabBarLabelStyle: { fontSize: 14 },
                        tabBarScrollEnabled: true,
                    }}
                >
                    <Tab.Screen name="General" children={() => <NewsFeed />} />
                    {tags.map((tag) => (
                        <Tab.Screen
                            key={tag}
                            name={tag}
                            children={() => (
                                <NewsFeed key={tag} tagName={tag} />
                            )}
                        />
                    ))}
                </Tab.Navigator>
            </View>
        </SafeAreaView>
    );
}

function MyTabBar({ state, descriptors, navigation, position }) {
    return (
        <View>
            <ScrollView horizontal>
                <View className=" flex flex-row pt-6 pb-3 px-4 rounded-b-2xl">
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
                            outputRange: inputRange.map((i) =>
                                i === index ? 1 : 0.2,
                            ),
                        });

                        return (
                            <TouchableOpacity
                                key={label}
                                activeOpacity={0.3}
                                accessibilityRole="button"
                                accessibilityState={
                                    isFocused ? { selected: true } : {}
                                }
                                accessibilityLabel={
                                    options.tabBarAccessibilityLabel
                                }
                                testID={options.tabBarTestID}
                                onPress={onPress}
                                onLongPress={onLongPress}
                                style={{
                                    flex: 1,
                                    paddingVertical: 8,
                                    paddingHorizontal: 16,
                                    opacity,
                                }}
                            >
                                <Animated.Text
                                    style={{
                                        textAlign: 'center',
                                        opacity,
                                        color: 'black',
                                        fontWeight: '500',
                                    }}
                                >
                                    {label}
                                </Animated.Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>
        </View>
    );
}
