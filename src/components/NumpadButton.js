import React from 'react';
import { TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import { black, numpadStyles, white, } from '../styles';

class NumpadButton extends React.Component {

    style = () => {
        return this.props.settings.darkMode ? numpadStyles.buttonD : numpadStyles.buttonL
    }

    iconColor = () => {
        if (this.props.special)
            return this.props.settings.accent;
        return this.props.settings.darkMode ? white : black;
    }

    render() {
        return (
            <TouchableOpacity 
                onPress={this.props.onPress}
                style={this.style()}
            >
                <Icon name={this.props.icon} color={this.iconColor()} size={35} />
            </TouchableOpacity>        
        )
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(NumpadButton);