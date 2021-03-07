import React from 'react';
import { TextInput, TouchableOpacity, View, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import { shade2, shade3 } from '../data/color';
import { signUpInputStyles, styles } from '../styles';


class SignUpInput extends React.Component {

    color = invert => this.props.settings.darkMode ^ invert ? shade2 : shade3;

    icon = () => {
        if (this.props.type === 'hidden')
            return this.props.hidden ? 'eye' : 'eye-off';
        return 'check';
    }

    iconColor = () => {
        if (this.props.type === 'confirmation')
            return this.props.confirm ? this.props.settings.accent : 'transparent';
        return this.color();
    }

    style = styleName => signUpInputStyles[styleName + (this.props.settings.darkMode ? "D" : "L")];

    render() {
        return (
            <View style={{...styles.columns, ...this.style('container')}}>
                <TextInput
                    onChangeText={this.props.onChangeText}
                    placeholder={this.props.placeholder}
                    placeholderTextColor={this.color(true)}
                    secureTextEntry={this.props.hidden}
                    style={this.style('inputBox')}
                    value={this.props.value}
                />
                <TouchableOpacity onPress={this.props.iconOnPress}>
                    <Icon
                        color={this.iconColor()}
                        name={this.icon()}
                        size={25}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings,
});

export default connect(mapStateToProps)(SignUpInput);