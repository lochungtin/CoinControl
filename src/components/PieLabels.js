import React from 'react';
import { Text, View, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { chartScreenStyles, styles, } from '../styles';

export default class PieLabels extends React.Component {

    category = () => this.props.dark ? chartScreenStyles.categoryTextD : chartScreenStyles.categoryTextL;

    percentage = () => this.props.dark ? chartScreenStyles.percentageTextD : chartScreenStyles.percentageTextL;

    render() {
        return (
            <View style={{ ...styles.columns, maxHeight: 25, justifyContent: 'space-between' }}>
                <Icon name={'square'} size={25} color={this.props.item.color} />
                <Text style={this.category()}>{this.props.item.category}</Text>
                <Text style={this.percentage()}>{Math.floor(this.props.item.percentage) + '%'}</Text>
            </View>
        )
    }
}