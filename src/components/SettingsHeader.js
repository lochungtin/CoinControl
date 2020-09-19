import React from 'react';
import { Text, View, } from 'react-native';

import { settingStyles } from '../styles';

export default class SettingsHeader extends React.Component {

    render() {
        return (
            <View style={settingStyles.titleContainer}>
                <Text style={this.props.dark ? settingStyles.titleStyleD : settingStyles.titleStyleL}>{this.props.title}</Text>
            </View>
        )
    }
}