import React from 'react';
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import { black, bubbleStyles, iconColors, white, } from '../styles';

class Bubble extends React.Component {

    constructor(props) {
        super(props);
        const icon = props.iconName !== undefined;
        this.state = {
            border: icon || props.text !== undefined,
            icon: icon,
        }
    }

    iconColor = () => {
        if (this.props.iconColor !== undefined)
            return this.props.iconColor;
        return this.props.settings.darkMode ? white : black;
    }

    render() {
        return (
            <TouchableOpacity
                style={{
                    ...bubbleStyles.bubble,
                    backgroundColor: this.state.border ? this.props.selected ? this.props.settings.darkMode ? iconColors.iconL : iconColors.iconD : this.props.color : this.props.color,
                    borderWidth: !this.state.border ? this.props.selected ? 3 : 0 : 0,
                    borderColor: this.props.settings.darkMode ? white : black,
                    height: this.props.size !== undefined ? this.props.size : 30,
                    margin: this.props.spacing !== undefined ? this.props.spacing : 7.5,
                    width: this.props.size !== undefined ? this.props.size : 30,
                }}
                onPress={this.props.onPress}
            >
                {this.state.icon &&
                    <Icon name={this.props.iconName} size={this.props.iconSize} color={this.iconColor()} />
                }
            </TouchableOpacity >
        )
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(Bubble);