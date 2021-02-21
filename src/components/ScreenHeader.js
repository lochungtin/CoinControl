import React from 'react';
import { TouchableOpacity, Text, View, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import { black, white, } from '../data/color';
import { headerStyles } from '../styles';

class ScreenHeader extends React.Component {

    iconColor = () => this.props.settings.darkMode ? white : black;

    style = styleName => headerStyles[styleName + (this.props.settings.darkMode ? "D" : "L")];

    render() {
        return (
            <View style={this.style('header')}>
                <TouchableOpacity onPress={this.props.back}>
                    <Icon
                        color={this.iconColor()}
                        name={'arrow-left'}
                        size={25}
                    />
                </TouchableOpacity>
                <View style={headerStyles.textContainer}>
                    <Text style={this.style('text')}>
                        {this.props.name}
                    </Text>
                </View>
                <TouchableOpacity onPress={this.props.action}>
                    <Icon
                        color={this.props.action ? this.iconColor() : 'transparent'}
                        name={this.props.icon || 'plus'}
                        size={25}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(ScreenHeader);
