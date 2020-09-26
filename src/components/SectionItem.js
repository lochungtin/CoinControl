import React from 'react';
import { TouchableOpacity, Text, View, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Bubble from '../components/Bubble';
import { black, homeScreenStyles, white, styles, } from '../styles';

export default class SectionItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }

    bubbleColor = () => {
        return this.props.dark ? homeScreenStyles.bubbleD : homeScreenStyles.bubbleL;
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
                            <Bubble
                                dark={this.props.dark}
                                color={this.bubbleColor().backgroundColor}
                                iconName={'pencil-outline'}
                                onPress={() => this.props.onEdit(this.props.item)}
                            />
                            <Bubble
                                dark={this.props.dark}
                                color={this.bubbleColor().backgroundColor}
                                iconName={'trash-can'}
                                onPress={() => this.props.onDelete(this.props.item.key)}
                            />
                        </View>
                    </>
                }
            </TouchableOpacity>

        );
    }
}