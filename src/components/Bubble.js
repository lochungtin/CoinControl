import React from 'react';
import { Text, TouchableOpacity, } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import { black, shade2, shade3, white, } from '../data/color';
import { bubbleStyles } from '../styles';

class Bubble extends React.Component {

    constructor(props) {
        super(props);
        const icon = props.iconName !== undefined;

        this.state = {
            border: icon || props.text !== undefined,
            icon: icon,
        }
    }

    iconColor = () => this.props.iconColor || (this.props.settings.darkMode ? white : black);

    fontColor = () => this.props.settings.darkMode ^ (this.props.color !== 'transparent') ? white : black;

    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={{
                    ...bubbleStyles.bubble,
                    backgroundColor: (this.state.border && this.props.selected) ? (this.props.settings.darkMode ? shade3 : shade2) : this.props.color,
                    borderColor: this.props.settings.darkMode ? white : black,
                    borderWidth: !this.state.border ? (this.props.selected ? 3 : 0) : 0,
                    height: this.props.size || 30,
                    margin: this.props.spacing || 7.5,
                    width: this.props.size || 30,
                }}
            >
                {this.props.text &&
                    <Text style={{ color: this.fontColor(), fontSize: 20, fontWeight: 'bold', }}>
                        {this.props.text}
                    </Text>
                }
                {this.state.icon &&
                    <Icon
                        color={this.iconColor()}
                        name={this.props.iconName}
                        size={this.props.iconSize}
                    />
                }
            </TouchableOpacity >
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(Bubble);