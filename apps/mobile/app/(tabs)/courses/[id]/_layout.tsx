import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import GeneralPage from './general';
import ActitivitiesPage from './activities';
import { Animated, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ResourcePage from './resource';
import NoticePage from './notice';

const Tab = createMaterialTopTabNavigator();

export default function Layout() {
    return (
        // <View className=" flex-1">
        // <SafeAreaView style={{ flex: 1 }}>
        <Tab.Navigator
            tabBar={(props) => <MyTabBar {...props} />}
            screenOptions={{}}
        >
            <Tab.Screen name="General" component={GeneralPage} />
            <Tab.Screen name="Activities" component={ActitivitiesPage} />
            <Tab.Screen name="Notices" component={NoticePage} />
            <Tab.Screen name="Resources" component={ResourcePage} />
        </Tab.Navigator>
        // </View>
    );
}

function MyTabBar({ state, descriptors, navigation, position }) {
    return (
        <View style={{ flexDirection: 'row' }}>
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
                    outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
                });

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1, marginTop: 50 }}
                    >
                        <Animated.Text style={{ opacity }}>
                            {label}
                        </Animated.Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}
