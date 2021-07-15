import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { connect } from 'react-redux';

import analytics from '../screens/analytics';
import category from '../screens/category';
import home from '../screens/home';
import newCategory from '../screens/newCategory';
import record from '../screens/record';
import resetPswd from '../screens/resetPswd';
import settings from '../screens/settings';
import signin from '../screens/signin';
import signup from '../screens/signup';

import { ReduxPropType } from '../types/redux';
import { makeDrawer } from './drawer';

const Nav = createDrawerNavigator();
const Category = createStackNavigator();
const Settings = createStackNavigator();

class AppNav extends React.Component<ReduxPropType> {

    category = () =>
        <Category.Navigator screenOptions={{ headerShown: false }}>
            <Category.Screen name='categoryHome' component={category} />
            <Category.Screen name='newCategory' component={newCategory} />
        </Category.Navigator>

    settings = () =>
        <Settings.Navigator screenOptions={{ headerShown: false }}>
            {/*<Nav.Screen name='settingsHome' component={settings} />*/}
            <Nav.Screen name='signin' component={signin} />
            <Nav.Screen name='signup' component={signup} />
            <Nav.Screen name='resetPswd' component={resetPswd} />
        </Settings.Navigator>

    render() {
        return (
            <NavigationContainer>
                <Nav.Navigator drawerContent={(props: any) => makeDrawer(props, this.props.theme)} initialRouteName='settings'>
                    <Nav.Screen name='home' component={home} />
                    <Nav.Screen name='record' component={record} />
                    <Nav.Screen name='analytics' component={analytics} />
                    <Nav.Screen name='category' component={this.category} />
                    <Nav.Screen name='settings' component={this.settings} />
                </Nav.Navigator>
            </NavigationContainer>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    theme: state.theme,
});

export default connect(mapStateToProps)(AppNav);
