import React from 'react';
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { black, bubbleStyles, white } from '../styles';

export default class Bubble extends React.Component {

    constructor(props) {
        super(props);
        const icon = props.iconName !== undefined;
        const border = icon || props.text !== undefined;
        this.state = {
            border: border,
            icon: icon,
        }
    }

    render() {
        return (
            <TouchableOpacity
                style={{
                    ...bubbleStyles.bubble,
                    backgroundColor: this.state.border ? this.props.selected ? white : this.props.color : this.props.color,
                    borderWidth: !this.state.border ? this.props.selected ? 6 : 0 : 0,
                    height: this.props.size !== undefined ? this.props.size : 30,
                    margin: this.props.spacing !== undefined ? this.props.spacing : 7.5,
                    width: this.props.size !== undefined ? this.props.size : 30,
                }}
                onPress={this.props.onPress}
            >
                {this.state.icon &&
                    <Icon name={this.props.iconName} size={this.props.iconSize} color={black} />
                }
            </TouchableOpacity >
        )
    }
}