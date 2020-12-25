import React from 'react';
import { TouchableOpacity, Text, View, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { black, white, } from '../data/color';
import { styles } from '../styles';

export default class CategoryItem extends React.Component {
    constructor(props) {
        super(props);
    }

    color = () => {
        return this.props.dark ? white : black;
    }

    render() {
        return (
            <View style={{ ...styles.columns, justifyContent: 'space-between', marginVertical: 5, paddingHorizontal: '15%', width: '100%' }}>
                <Icon name={this.props.item.iconName} size={25} color={this.props.accent} />
                <Text style={{ color: this.color(), width: '50%' }}>{this.props.item.key}</Text>
                <View style={{ width: '20%' }}>
                    {!this.props.item.default && this.props.expand &&
                        <View style={{ ...styles.columns, justifyContent: 'space-between', }}>
                            <TouchableOpacity onPress={() => this.props.action(this.props.item.key)}>
                                <Icon name={'trash-can'} size={25} color={this.color()} />
                            </TouchableOpacity>
                        </View>
                    }
                </View>

            </View>
        )
    }
}