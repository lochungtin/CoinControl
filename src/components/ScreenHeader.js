import React from 'react';
import { TouchableOpacity, Text, View, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { black, headerStyles, white } from '../styles';

export default class ScreenHeader extends React.Component {
    render() {
        return (
            <View style={this.props.dark ? headerStyles.headerD : headerStyles.headerL}>
                <TouchableOpacity onPress={this.props.action}>
                    <Icon name={'arrow-left'} size={25} color={this.props.dark ? white : black} />
                </TouchableOpacity>
                <View style={headerStyles.textContainer}>
                    <Text style={this.props.dark ? headerStyles.textD : headerStyles.textL}>{this.props.name}</Text>
                </View>
            </View>
        )
    }
}
