import React from 'react';
import { TouchableOpacity, Text, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { black, homeScreenStyles, white, } from '../styles';

export default class SectionItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }

    container = () => {
        return this.props.dark ? homeScreenStyles.sectionItemD : homeScreenStyles.sectionItemL;
    }

    iconColor = () => {
        return this.props.dark ? white : black;
    }

    textCategory = () => {
        return this.props.dark ? homeScreenStyles.textCatD : homeScreenStyles.textCatL;
    }

    textValue = () => {
        return this.props.dark ? homeScreenStyles.textValD : homeScreenStyles.textValL;
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this.setState({ open: !this.state.open })} style={this.container()}>
                <Icon name={this.props.item.icon} size={20} color={this.iconColor()} />
                <Text style={this.textCategory()}>{this.props.item.category}</Text>
                <Text style={this.textValue()}>{(this.props.item.type === 'Expense' ? '-' : '+') + this.props.item.value}</Text>
            </TouchableOpacity>
        );
    }
}