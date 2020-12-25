import React from 'react';
import { Switch, TouchableOpacity, Text, View, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import { shade2, shade3, white, } from '../data/color';
import { settingStyles } from '../styles';

class SettingsItem extends React.Component {

    iconColor = () => {
        if (this.props.disabled) 
            return this.style('textDisabled').color;
        return this.props.settings.darkMode ? shade2 : shade3;
    }

    iconRColor = () => {
        if (this.props.iconRColor !== undefined)
            return this.props.iconRColor;
        return this.iconColor();
    }

    iconRight = () => {
        return this.props.iconR === undefined ? 'arrow-right' : this.props.iconR;
    }

    text = () => {
        return this.props.disabled ? this.style('textDisabled') : this.style('text');
    }

    style = styleName => {
        return settingStyles[styleName + (this.props.settings.darkMode ? "D" : "L")];
    }

    render() {
        if (this.props.switch)
            return (
                <View style={this.style('itemContainer')}>
                    <Icon name={this.props.iconL} size={20} color={this.iconColor()} />
                    <Text style={this.text()}>
                        {this.props.text}
                    </Text>
                    <View style={settingStyles.settingRight}>
                        <Switch
                            thumbColor={white}
                            trackColor={{ false: this.style('icon'), true: this.props.settings.accent }}
                            value={this.props.state}
                            onChange={() => this.props.action(!this.props.state)}
                        />
                    </View>
                </View>

            )
        else
            return (
                <TouchableOpacity onPress={this.props.action} style={this.style('itemContainer')}>
                    <Icon name={this.props.iconL} size={20} color={this.iconColor()} />
                    <Text style={this.text()}>
                        {this.props.text}
                    </Text>
                    <View style={settingStyles.settingRight}>
                        <Icon name={this.iconRight()} size={20} color={this.iconRColor()} />
                    </View>
                </TouchableOpacity>
            )
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(SettingsItem);