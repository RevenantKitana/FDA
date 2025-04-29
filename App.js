import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, Dimensions, TouchableOpacity, Keyboard } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';
import React, { useState, useEffect } from 'react';

// Import các màn hình từ thư mục screens
import DashboardScreen from './screens/DashboardScreen';
import MyFoodScreen from './screens/MyFoodScreen';
import FoodDetailsScreen from './screens/FoodDetailsScreen';
import AddItemScreen from './screens/AddItemScreen';
import NotificationScreen from './screens/NotificationScreen';
import ProfileScreen from './screens/ProfileScreen';
import ReviewScreen from './screens/ReviewScreen';

// Đường dẫn tới các icon
const menuIcon = require('./assets/menu.png');
const plusIcon = require('./assets/plus.png');
const bellIcon = require('./assets/bell.png');
const userIcon = require('./assets/user.png');

// Stack Navigator cho MyFoodScreen và FoodDetailsScreen
const Stack = createStackNavigator();
const MyFoodStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="MyFood"
            component={MyFoodScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="FoodDetails"
            component={FoodDetailsScreen}
            options={{ headerShown: false }}
        />
    </Stack.Navigator>
);

// Stack Navigator cho ProfileScreen và ReviewScreen
const ProfileStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="ReviewScreen"
            component={ReviewScreen}
            options={{ headerShown: false }}
        />
    </Stack.Navigator>
);

// Component BottomTab
const BottomTab = ({ state, navigation }) => {
    return (
        <View style={styles.bottomTab}>
            <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
                <Icon
                    name="grid"
                    size={24}
                    color={state.index === 0 ? '#FF7622' : '#AFAFAF'}
                    style={styles.tabIcon}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('MyFoodStack')}>
                <Image
                    source={menuIcon}
                    style={[styles.tabIcon, { tintColor: state.index === 1 ? '#FF7622' : '#AFAFAF' }]}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddItem')}
            >
                <Image
                    source={plusIcon}
                    style={[styles.tabIcon, { tintColor: state.index === 2 ? '#FF7622' : '#AFAFAF' }]}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
                <Image
                    source={bellIcon}
                    style={[styles.tabIcon, { tintColor: state.index === 3 ? '#FF7622' : '#AFAFAF' }]}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ProfileStack')}>
                <Image
                    source={userIcon}
                    style={[styles.tabIcon, { tintColor: state.index === 4 ? '#FF7622' : '#AFAFAF' }]}
                />
            </TouchableOpacity>
        </View>
    );
};

const Tab = createBottomTabNavigator();

export default function App() {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => setKeyboardVisible(true)
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => setKeyboardVisible(false)
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    return (
        <NavigationContainer>
            <Tab.Navigator
                tabBar={(props) => (isKeyboardVisible ? null : <BottomTab {...props} />)}
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Tab.Screen name="Dashboard" component={DashboardScreen} />
                <Tab.Screen name="MyFoodStack" component={MyFoodStack} />
                <Tab.Screen name="AddItem" component={AddItemScreen} />
                <Tab.Screen name="Notification" component={NotificationScreen} />
                <Tab.Screen name="ProfileStack" component={ProfileStack} />
            </Tab.Navigator>
            <StatusBar style="auto" />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    bottomTab: {
        position: 'absolute',
        bottom: 0,
        width: Dimensions.get('window').width,
        height: 89,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.05,
        shadowRadius: 20,
    },
    addButton: {
        width: 50,
        height: 50,
        backgroundColor: '#FFF1F2',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#FF7622',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabIcon: {
        width: 24,
        height: 24,
    },
});