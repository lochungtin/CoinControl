import React from 'react';
import { Switch, TouchableOpacity, Text, View, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import { shade2, shade3, white, } from '../data/color';
import { settingStyles } from '../styles';

class SettingsItem extends React.Component {

    close = () => this.setState({ open: false });

    iconColor = () => {
        if (this.props.disabled)
            return this.style('textDisabled').color;
        return this.props.settings.darkMode ? shade2 : shade3;
    }

    iconRColor = () => this.props.iconRColor || this.iconColor();

    iconRight = () => this.props.iconR || 'arrow-right';

    onChange = () => this.props.action(!this.props.state);

    style = styleName => settingStyles[styleName + (this.props.settings.darkMode ? "D" : "L")];

    text = () => this.props.disabled ? this.style('textDisabled') : this.style('text');

    render() {
        return (<>
            {this.props.switch ?
                <View style={this.style('itemContainer')}>
                    <Icon
                        color={this.iconColor()}
                        name={this.props.iconL}
                        size={20}
                    />
                    <Text style={this.text()}>
                        {this.props.text}
                    </Text>
                    <View style={settingStyles.settingRight}>
                        <Switch
                            onChange={this.onChange}
                            thumbColor={white}
                            trackColor={{ false: this.iconColor(), true: this.props.settings.accent, }}
                            value={this.props.state}
                        />
                    </View>
                </View> :
                <TouchableOpacity onPress={this.props.action}>
                    <View style={this.style('itemContainer')}>
                        <Icon
                            color={this.iconColor()}
                            name={this.props.iconL}
                            size={20}
                        />
                        <Text style={this.text()}>
                            {this.props.text}
                        </Text>
                        <View style={settingStyles.settingRight}>
                            <Icon
                                color={this.iconRColor()}
                                name={this.iconRight()}
                                size={20}
                            />
                        </View>
                    </View>
                    {this.props.children && this.props.open &&
                        <View style={this.style('itemChildContainer')}>
                            {this.props.children}
                        </View>
                    }
                </TouchableOpacity>
            }
        </>);
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(SettingsItem);