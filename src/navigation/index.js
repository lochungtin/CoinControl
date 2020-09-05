import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import accountScreen from '../screens/accountScreen';
import chartScreen from '../screens/chartScreen';
import customCategory from '../screens/customCategory';
import homeScreen from '../screens/homeScreen';
import settingsScreen from '../screens/settingsScreen';
import updateRecordScreen from '../screens/updateRecordScreen';

const Main = createStackNavigator();
const Settings = createStackNavigator();

const Root = createBottomTabNavigator();

const main = () => {
    return (
        <Main.Navigator>
            <Main.Screen name='Home' component={homeScreen} />
            <Main.Screen name='Update' component={updateRecordScreen} />
            <Main.Screen name='Category' component={customCategory} />
        </Main.Navigator>
    )
}

const settings = () => {
    return (
        <Settings.Navigator>
            <Settings.Screen name='Settings' component={settingsScreen} />
            <Settings.Screen name='Account' component={accountScreen} />
            <Settings.Screen name='Catergory' component={customCategory} />
        </Settings.Navigator>
    )
}

export default class AppNav extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Root.Navigator
                    initialRouteName='Home'
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let name = '';
                            switch (route.name) {
                                case 'Chart':
                                    name = focused ? 'chart-donut' : 'chart-donut-variant';
                                    break;
                                case 'Home':
                                    name = focused ? 'home' : 'home-outline';
                                    break;
                                case 'Settings':
                                    name = focused ? 'dots-horizontal-circle' : 'dots-horizontal-circle-outline';
                                    break;
                            }
                            return <Icon name={name} size={size} color={color} />
                        }
                    })}
                >
                    <Root.Screen name='Chart' component={chartScreen} />
                    <Root.Screen name='Home' component={main} />
                    <Root.Screen name='Settings' component={settings} />
                </Root.Navigator>
            </NavigationContainer>
        )
    }
}