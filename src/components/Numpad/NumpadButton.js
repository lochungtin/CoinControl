import React from 'react';
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import { black, shade2, shade3, white, } from '../../data/color';
import { numpadStyles } from '../../styles';

class NumpadButton extends React.Component {

    iconColor = () => {
        if (this.props.special)
            return this.props.settings.accent;
        if (this.props.disabled)
            return this.props.settings.darkMode ? shade3 : shade2;
        return this.props.settings.darkMode ? white : black;
    }

    onPress = () => {
        if (!this.props.disabled || this.props.special)
            this.props.onPress()
    }

    style = () => this.props.settings.darkMode ? numpadStyles.buttonD : numpadStyles.buttonL;

    render() {
        return (
            <TouchableOpacity
                onPress={this.onPress}
                style={this.style()}
            >
                {this.props.children !== undefined ? this.props.children :
                    <>
                        <Icon name={this.props.icon} color={this.iconColor()} size={35} />
                    </>
                }
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(NumpadButton);