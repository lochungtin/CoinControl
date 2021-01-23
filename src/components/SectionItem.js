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

    bgColor = toggle => {
        const type = this.item('type');
        if (this.props.settings.darkMode)
            return type === 'Expense' ^ toggle ? shade4 : shade3;
        return type === 'Expense' ^ toggle ? shade1 : shade2;
    }

    catValue = () => {
        const cat = (this.item('type') === 'Expense' ? this.props.expenseCategories : this.props.incomeCategories)[this.item('catKey')];
        if (cat === undefined)
            return { color: white, iconName: 'crop-free', name: 'other', };
        return cat;
    }

    iconColor = () => this.props.settings.darkMode ? white : black;

    item = value => {
        const keyset = this.props.itemkey.split(':');
        return this.props.data.data[keyset[0]][keyset[1]][value]
    }

    style = (stylesheet, styleName) => stylesheet[styleName + (this.props.settings.darkMode ? "D" : "L")];

    render() {
        return (
            <TouchableOpacity onPress={() => this.setState({ open: !this.state.open })} style={{ ...homeScreenStyles.sectionItem, backgroundColor: this.bgColor(false) }}>
                <View style={{ ...styles.columns, justifyContent: 'space-between' }}>
                    <Icon name={this.catValue().iconName} size={20} color={this.catValue().color} />
                    <Text style={this.style(homeScreenStyles, 'textCat')}>
                        {this.catValue().name}
                    </Text>
                    <Text style={this.style(homeScreenStyles, 'textVal')}>
                        {this.item('value')}
                    </Text>
                </View>
                {(this.state.open || !this.props.compactMode) &&
                    <>
                        {this.item('title') !== '' &&
                            <View style={{ ...styles.columns, justifyContent: 'space-between' }}>
                                <Icon name={this.catValue().iconName} size={20} color={'transparent'} />
                                <Text style={this.style(homeScreenStyles, 'textCat')}>
                                    Title: {this.item('title')}
                                </Text>
                                <Text style={{ ...this.style(homeScreenStyles, 'textVal'), color: 'transparent' }}>
                                    {this.item('value')}
                                </Text>
                            </View>
                        }
                        <View style={{ ...styles.columns, justifyContent: 'space-between' }}>
                            <View style={{ width: '70%' }} />
                            <Bubble
                                color={this.bgColor(true)}
                                iconName={'pencil-outline'}
                                iconColor={this.props.settings.accent}
                                onPress={() => this.props.onEdit(this.props.itemkey)}
                            />
                            <Bubble
                                color={this.bgColor(true)}
                                iconName={'trash-can'}
                                iconColor={this.props.settings.accent}
                                onPress={() => this.props.onDelete(this.props.itemkey)}
                            />
                        </View>
                    </>
                }
            </TouchableOpacity>

        );
    }
}

const mapStateToProps = state => ({
    data: state.data,
    expenseCategories: state.expenseCategories,
    incomeCategories: state.incomeCategories,
    settings: state.settings
});

export default connect(mapStateToProps)(SectionItem);