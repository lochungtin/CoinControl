import React from 'react';
import { Switch, TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { settingStyles, iconColors, white, } from '../styles';

export default class SettingsItem extends React.Component {

    container = () => {
        return this.props.dark ? settingStyles.itemContainerD : settingStyles.itemContainerL;
    }

    iconColor = () => {
        if (this.props.disabled) 
            return this.props.dark ? settingStyles.textDisabledD.color : settingStyles.textDisabledL.color;
        return this.props.dark ? iconColors.iconD : iconColors.iconL;
    }

    iconRColor = () => {
        if (this.props.disabled) 
            return this.props.dark ? settingStyles.textDisabledD.color : settingStyles.textDisabledL.color;
        return this.props.iconRColor === undefined ? this.props.dark ? iconColors.iconD : iconColors.iconL : this.props.iconRColor;
    }

    iconRight = () => {
        return this.props.iconR === undefined ? 'arrow-right' : this.props.iconR;
    }

    text = () => {
        if (this.props.disabled) 
            return this.props.dark ? settingStyles.textDisabledD : settingStyles.textDisabledL;
        else 
            return this.props.dark ? settingStyles.textD : settingStyles.textL;
    }

    render() {
        if (this.props.switch)
            return (
                <View style={this.container()}>
                    <Icon name={this.props.iconL} size={20} color={this.iconColor()} />
                    <Text style={this.text()}>{this.props.text}</Text>
                    <View style={settingStyles.settingRight}>
                        <Switch
                            thumbColor={white}
                            trackColor={{ false: this.props.dark ? settingStyles.iconD : settingStyles.iconL, true: this.props.accent }}
                            value={this.props.state}
                            onChange={() => this.props.action(!this.props.state)}
                        />
                    </View>
                </View>

            )
        else
            return (
                <TouchableOpacity onPress={this.props.action} style={this.container()}>
                    <Icon name={this.props.iconL} size={20} color={this.iconColor()} />
                    <Text style={this.text()}>{this.props.text}</Text>
                    <View style={settingStyles.settingRight}>
                        <Icon name={this.iconRight()} size={20} color={this.iconRColor()} />
                    </View>
                </TouchableOpacity>
            )
    }
}