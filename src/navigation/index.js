import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import accountScreen from '../screens/accountScreen';
import chartScreen from '../screens/chartScreen';
import customCategoryScreen from '../screens/iconSelectionScreen';
import homeScreen from '../screens/homeScreen';
import settingsScreen from '../screens/settingsScreen';
import updateRecordScreen from '../screens/categoryScreen';

import { black, bgColorD, bgColorL, white, } from '../data/color';

const Main = createStackNavigator();
const Settings = createStackNavigator();
const Root = createBottomTabNavigator();

class AppNav extends React.Component {

    main = () => (
        <Main.Navigator>
            <Main.Screen name='Home' component={homeScreen} options={{ headerShown: false }} />
            <Main.Screen name='Update' component={updateRecordScreen} options={{ headerShown: false }} />
            <Main.Screen name='Icons' component={customCategoryScreen} options={{ headerShown: false }} />
        </Main.Navigator>
    );

    settings = () => (
        <Settings.Navigator>
            <Settings.Screen name='Settings' component={settingsScreen} options={{ headerShown: false }} />
            <Settings.Screen name='Account' component={accountScreen} options={{ headerShown: false }} />
            <Settings.Screen name='Icons' component={customCategoryScreen} options={{ headerShown: false }} />
        </Settings.Navigator>
    );

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
                                    name = 'chart-donut';
                                    break;
                                case 'Home':
                                    name = 'home';
                                    break;
                                case 'Settings':
                                    name = 'dots-horizontal-circle-outline';
                                    break;
                            }
                            return <Icon name={name} size={size} color={color} />
                        }
                    })}
                    tabBarOptions={{
                        activeBackgroundColor: this.props.settings.darkMode ? bgColorD : bgColorL,
                        activeTintColor: this.props.settings.accent,
                        inactiveBackgroundColor: this.props.settings.darkMode ? bgColorD : bgColorL,
                        inactiveTintColor: this.props.settings.darkMode ? white : black,
                        keyboardHidesTabBar: true,
                        showLabel: false,
                        style: {
                            backgroundColor: this.props.settings.darkMode ? bgColorD : bgColorL,
                            borderTopColor: 'transparent',
                        },
                    }}
                >
                    <Root.Screen name='Chart' component={chartScreen} />
                    <Root.Screen name='Home' component={this.main} />
                    <Root.Screen
                        name='Settings'
                        component={this.settings}
                        listeners={({ navigation, route }) => ({
                            tabPress: e => {
                                e.preventDefault();
                                navigation.navigate('Settings', { darkMode: this.props.settings.darkMode, title: 'Settings' });
                            },
                        })}
                    />
                </Root.Navigator>
            </NavigationContainer>
        )
    }
}

const mapStateToProps = state => ({
    expenseCategories: state.expenseCategories,
    expenseSelection: state.expenseSelection,
    goal: state.goal,
    incomeCategories: state.incomeCategories,
    incomeSelection: state.incomeSelection,
    settings: state.settings
})

export default connect(mapStateToProps)(AppNav);