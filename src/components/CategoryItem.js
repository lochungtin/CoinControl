import React from 'react';
import { TouchableOpacity, Text, View, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { black, styles, white } from '../styles';

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
                    {this.props.item.default &&
                        <Text style={{ color: this.color() }}>Default</Text>
                    }
                    {!this.props.item.default &&
                        <View style={{...styles.columns, justifyContent: 'space-between', }}>
                            <TouchableOpacity>
                                <Icon name={'pencil-outline'} size={25} color={this.color()} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon name={'trash-can'} size={25} color={this.color()} />
                            </TouchableOpacity>
                        </View>
                    }
                </View>

            </View>
        )
    }
}