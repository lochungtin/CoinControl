import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StatusBar } from 'react-native';
import NavigationBar from 'react-native-navbar-color';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import accountScreen from '../screens/accountScreen';
import chartScreen from '../screens/chartScreen';
import updateRecordScreen from '../screens/categoryScreen';
import detailScreen from '../screens/detailScreen';
import customCategoryScreen from '../screens/iconSelectionScreen';
import homeScreen from '../screens/homeScreen';
import reportScreen from '../screens/reportScreen';
import settingsScreen from '../screens/settingsScreen';

import { black, bgColorD, bgColorL, rgba, shade2, white, } from '../data/color';

const Main = createStackNavigator();
const Report = createStackNavigator();
const ReportSelection = createDrawerNavigator();
const Root = createBottomTabNavigator();
const Settings = createStackNavigator();

class AppNav extends React.Component {

    componentDidMount() {
        NavigationBar.setColor(this.props.settings.darkMode ? bgColorD : shade2);
    }

    bgColor = () => this.props.settings.darkMode ? bgColorD : bgColorL;

    iconDrawer = ({ route }) => ({
        drawerIcon: ({ focused, color, size }) => {
            let name = '';
            switch (route.name) {
                case 'All':
                    name = 'text-box-multiple-outline';
                    break;
                case 'Daily':
                    name = 'calendar';
                    break;
                case 'Weekly':
                    name = 'calendar-week';
                    break;
                case 'Monthly':
                    name = 'calendar-month';
                    break;
            }
            return <Icon name={name} size={20} color={color} />
        }
    });

    iconTab = ({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
            let name = '';
            switch (route.name) {
                case 'Reports':
                    name = 'text-box-multiple-outline';
                    break;
                case 'Chart':
                    name = 'chart-donut';
                    break;
                case 'Home':
                    name = 'home';
                    break;
                case 'Settings':
                    name = 'cog';
                    break;
            }
            return <Icon name={name} size={size} color={color} />
        }
    });

    main = () => (
        <Main.Navigator>
            <Main.Screen name='Home' component={homeScreen} options={{ headerShown: false }} />
            <Main.Screen name='Update' component={updateRecordScreen} options={{ headerShown: false }} />
            <Main.Screen name='Icons' component={customCategoryScreen} options={{ headerShown: false }} />
        </Main.Navigator>
    );

    reports = () => (
        <Report.Navigator>
            <Report.Screen name='Selection' component={this.reportSelection} options={{ headerShown: false }} />
            <Report.Screen name='Detail' component={detailScreen} options={{ headerShown: false }} />
        </Report.Navigator>
    );

    reportSelection = () => (
        <ReportSelection.Navigator
            drawerStyle={{
                backgroundColor: this.bgColor(),
            }}
            drawerContentOptions={{
                activeBackgroundColor: rgba(this.props.settings.accent, 0.2),
                activeTintColor: this.props.settings.accent,
                inactiveTintColor: this.props.settings.darkMode ? white : black,
            }}
        >
            <ReportSelection.Screen name='All' component={reportScreen} options={this.iconDrawer} />
            <ReportSelection.Screen name='Daily' component={reportScreen} options={this.iconDrawer} />
            <ReportSelection.Screen name='Weekly' component={reportScreen} options={this.iconDrawer} />
            <ReportSelection.Screen name='Monthly' component={reportScreen} options={this.iconDrawer} />
        </ReportSelection.Navigator>
    );

    settings = () => (
        <Settings.Navigator>
            <Settings.Screen name='Settings' component={settingsScreen} options={{ headerShown: false }} />
            <Settings.Screen name='Account' component={accountScreen} options={{ headerShown: false }} />
            <Settings.Screen name='Icons' component={customCategoryScreen} options={{ headerShown: false }} />
        </Settings.Navigator>
    );

    statusBarStyle = () => this.props.settings.darkMode ? 'light-content' : 'dark-content';

    render() {
        return (
            <NavigationContainer>
                <StatusBar backgroundColor={this.bgColor()} barStyle={this.statusBarStyle()} />
                <Root.Navigator
                    initialRouteName='Home'
                    screenOptions={this.iconTab}
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
                    <Root.Screen name='Reports' component={this.reports} />
                    <Root.Screen name='Chart' component={chartScreen} />
                    <Root.Screen name='Home' component={this.main} />
                    <Root.Screen name='Settings' component={this.settings} />
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