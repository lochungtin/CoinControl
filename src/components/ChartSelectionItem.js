import React from 'react';
import { TouchableOpacity, Text, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { black, styles, white } from '../styles';

export default class ChartSelectionItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: this.props.selected,
        }
    }

    color = () => {
        return this.props.dark ? white : black;
    }

    icon = () => {
        return this.state.selected ? 'checkbox-marked-circle-outline' : 'checkbox-blank-circle-outline';
    }

    render() {
        return (
            <TouchableOpacity
                onPress={() => {
                    if (this.props.canRemove && this.state.selected) {
                        this.props.action(this.props.item.key, false);
                        this.setState({ selected: false });
                    }
                    else if (this.props.canAdd && !this.state.selected) {
                        this.props.action(this.props.item.key, true);
                        this.setState({ selected: true });
                    }
                }}
                style={{ ...styles.columns, justifyContent: 'space-between', marginVertical: 5, paddingHorizontal: '15%', width: '100%' }}
            >
                <Icon name={this.icon()} size={25} color={this.props.accent} />
                <Text style={{ color: this.color(), width: '50%' }}>{this.props.item.key}</Text>
                <Icon name={this.props.item.iconName} size={25} color={this.color()} />
            </TouchableOpacity>
        )
    }
}