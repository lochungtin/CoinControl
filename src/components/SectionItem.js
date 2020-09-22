import React from 'react';
import { TouchableOpacity, Text, View, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { black, homeScreenStyles, white, styles, } from '../styles';

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
                <View style={{ ...styles.columns, justifyContent: 'space-between' }}>
                    <Icon name={this.props.item.icon} size={20} color={this.props.accent} />
                    <Text style={this.textCategory()}>{this.props.item.category}</Text>
                    <Text style={this.textValue()}>{(this.props.item.type === 'Expense' ? '-' : '+') + this.props.item.value}</Text>
                </View>
                {(this.state.open || !this.props.compactMode) &&
                    <>
                        <View style={{ ...styles.columns, justifyContent: 'space-between' }}>
                            <Icon name={this.props.item.icon} size={20} color={'transparent'} />
                            <Text style={this.textCategory()}>Title: {this.props.item.title}</Text>
                            <Text style={{ ...this.textValue(), color: 'transparent' }}>{(this.props.item.type === 'Expense' ? '-' : '+') + this.props.item.value}</Text>
                        </View>
                        <View style={{ ...styles.columns, justifyContent: 'space-between' }}>
                            <View style={{ width: '70%' }} />
                            <TouchableOpacity onPress={() => { }}>
                                <Icon name={'pencil-outline'} size={20} color={this.iconColor()} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.onDelete(this.props.item.key)}>
                                <Icon name={'trash-can'} size={20} color={this.iconColor()} />
                            </TouchableOpacity>
                        </View>
                    </>
                }
            </TouchableOpacity>

        );
    }
}