import React from 'react';
import { TouchableOpacity, Text, View, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Bubble from '../components/Bubble';

import { black, shade1, shade2, shade3, shade4, white, } from '../data/color';
import { homeScreenStyles, styles, } from '../styles';

class SectionItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }

    bgColor = () => {
        if (this.props.settings.darkMode)
            return this.props.item.type === 'Expense' ? shade4 : shade3;
        return this.props.item.type === 'Expense' ? shade1: shade2;
    }

    catValue = () => {
        const cat = (this.props.item.type === 'Expense' ? this.props.expenseCategories : this.props.incomeCategories)[this.props.item.catKey];
        if (cat === undefined)
            return { color: white, iconName: 'crop-free', name: 'other', };
        return cat;
    }

    iconColor = () => this.props.settings.darkMode ? white : black;

    style = (stylesheet, styleName) => stylesheet[styleName + (this.props.settings.darkMode ? "D" : "L")];

    render() {
        return (
            <TouchableOpacity onPress={() => this.setState({ open: !this.state.open })} style={{...homeScreenStyles.sectionItem, backgroundColor: this.bgColor()}}>
                <View style={{ ...styles.columns, justifyContent: 'space-between' }}>
                    <Icon name={this.catValue().iconName} size={20} color={this.catValue().color} />
                    <Text style={this.style(homeScreenStyles, 'textCat')}>
                        {this.catValue().name}
                    </Text>
                    <Text style={this.style(homeScreenStyles, 'textVal')}>
                        {this.props.item.value}
                    </Text>
                </View>
                {(this.state.open || !this.props.compactMode) &&
                    <>
                        {this.props.item.title !== '' &&
                            <View style={{ ...styles.columns, justifyContent: 'space-between' }}>
                                <Icon name={this.catValue().iconName} size={20} color={'transparent'} />
                                <Text style={this.style(homeScreenStyles, 'textCat')}>
                                    Title: {this.props.item.title}
                                </Text>
                                <Text style={{ ...this.style(homeScreenStyles, 'textVal'), color: 'transparent' }}>
                                    {this.props.item.value}
                                </Text>
                            </View>
                        }
                        <View style={{ ...styles.columns, justifyContent: 'space-between' }}>
                            <View style={{ width: '70%' }} />
                            <Bubble
                                color={this.style(homeScreenStyles, 'bubble').backgroundColor}
                                iconName={'pencil-outline'}
                                iconColor={this.props.settings.accent}
                                onPress={() => this.props.onEdit(this.props.item)}
                            />
                            <Bubble
                                color={this.style(homeScreenStyles, 'bubble').backgroundColor}
                                iconName={'trash-can'}
                                iconColor={this.props.settings.accent}
                                onPress={() => this.props.onDelete(this.props.item.key)}
                            />
                        </View>
                    </>
                }
            </TouchableOpacity>

        );
    }
}

const mapStateToProps = state => ({
    expenseCategories: state.expenseCategories,
    incomeCategories: state.incomeCategories,
    settings: state.settings
});

export default connect(mapStateToProps)(SectionItem);