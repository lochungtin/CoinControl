import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import { defaultExpenseCategory, defaultIncomeCategory } from '../redux/action';
import { store } from '../redux/store';
import accountScreen from '../screens/accountScreen';
import chartScreen from '../screens/chartScreen';
import customCategory from '../screens/customCategory';
import homeScreen from '../screens/homeScreen';
import settingsScreen from '../screens/settingsScreen';
import updateRecordScreen from '../screens/updateRecordScreen';
import { accent, bgColor, white } from '../styles';

const Main = createStackNavigator();
const Settings = createStackNavigator();
const Root = createBottomTabNavigator();

const stackScreenHeaderStyle = {
    backgroundColor: bgColor,
    borderBottomWidth: 2,
}

const main = () => {
    return (
        <Main.Navigator>
            <Main.Screen name='Home' component={homeScreen} options={{ headerShown: false }} />
            <Main.Screen
                name='Update'
                component={updateRecordScreen}
                options={({ route }) =>
                    ({
                        headerStyle: stackScreenHeaderStyle,
                        headerTintColor: white,
                        title: route.params.title
                    })}
            />
            <Main.Screen
                name='Category'
                component={customCategory}
                options={({ route }) =>
                    ({
                        headerStyle: stackScreenHeaderStyle,
                        headerTintColor: white,
                        title: 'New ' + route.params.title
                    })}
            />
        </Main.Navigator>
    )
}

const settings = () => {
    return (
        <Settings.Navigator screenOptions={{ headerShown: false }}>
            <Settings.Screen name='Settings' component={settingsScreen} />
            <Settings.Screen name='Account' component={accountScreen} />
            <Settings.Screen name='Catergory' component={customCategory} />
        </Settings.Navigator>
    )
}

class AppNav extends React.Component {

    constructor(props) {
        super(props);
        if (props.expenseCategories === null || Object.keys(props.expenseCategories).length === 0)
            store.dispatch(defaultExpenseCategory());
        if (props.incomeCategories === null || Object.keys(props.incomeCategories).length === 0)
            store.dispatch(defaultIncomeCategory());
    }

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
                        activeBackgroundColor: bgColor,
                        activeTintColor: accent,
                        inactiveBackgroundColor: bgColor,
                        inactiveTintColor: white,
                        keyboardHidesTabBar: true,
                        showLabel: false,
                        style: {
                            backgroundColor: bgColor,
                            borderTopColor: 'transparent',
                        },
                    }}
                >
                    <Root.Screen name='Chart' component={chartScreen} />
                    <Root.Screen name='Home' component={main} />
                    <Root.Screen name='Settings' component={settings} />
                </Root.Navigator>
            </NavigationContainer>
        )
    }
}

const mapStateToProps = state => ({
    expenseCategories: state.expenseCategories,
    incomeCategories: state.incomeCategories,
})

export default connect(mapStateToProps)(AppNav);