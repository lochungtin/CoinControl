import React from 'react';
import { ScrollView, Text, TouchableOpacity, View, } from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';

import ScreenHeader from '../components/ScreenHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { icons } from '../data/icons';

import { iconSelectionScreen, styles, } from '../styles';
import CategoryModal from '../components/CategoryModal';

class Screen extends React.Component {

    constructor(props) {
        super(props);
        var opened = {};
        for (const type of Object.keys(icons)) {
            opened[type] = true;
        }
        this.state = {
            inputOpen: false,
            opened: opened,
            selection: 'none',
            types: Object.keys(icons),
        };
    }

    makeGrid = arr => {
        var grid = [];
        for (let i = 0; i < arr.length; i += 6) {
            var row = arr.slice(i, i + 6);
            var filler = [];
            for (let j = 0; j < 6 - row.length; j++) {
                filler.push('numeric-' + j);
            }
            grid.push([...row, ...filler]);
        }
        return grid;
    }

    iconColor = icon => icon.startsWith('numeric') ? 'transparent' : this.props.settings.accent;

    openIcon = open => open ? 'chevron-down' : 'chevron-right';

    toggleOpen = type => {
        var newState = { ...this.state.opened };
        newState[type] = !newState[type];
        this.setState({ opened: newState });
    }

    style = styleName => iconSelectionScreen[styleName + (this.props.settings.darkMode ? "D" : "L")];

    render() {
        return (
            <View style={this.props.settings.darkMode ? styles.screenD : styles.screenL}>
                <ScreenHeader
                    back={() => this.props.navigation.goBack()}
                    name={'Custom Categories'}
                />
                <ScrollView style={{ width: '100%' }}>
                    {this.state.types.map(type => {
                        return (
                            <View key={type}>
                                <TouchableOpacity onPress={() => this.toggleOpen(type)} style={this.style('header')}>
                                    <Text style={this.style('headerText')}>{type.toUpperCase()}</Text>
                                    <Icon name={this.openIcon(this.state.opened[type])} size={20} color={this.style('headerText').color} />
                                </TouchableOpacity>
                                {this.state.opened[type] && this.makeGrid(icons[type]).map(row => {
                                    return (
                                        <View key={row} style={{ ...styles.columns, height: 70, justifyContent: 'space-evenly' }}>
                                            {row.map(icon => {
                                                return (
                                                    <TouchableOpacity key={icon} onPress={() => this.setState({ inputOpen: true, selection: icon })}>
                                                        <Icon name={icon} size={35} color={this.iconColor(icon)} key={icon} />
                                                    </TouchableOpacity>
                                                );
                                            })}
                                        </View>
                                    );
                                })}
                            </View>
                        );
                    })}
                </ScrollView>
                <CategoryModal
                    confirm={catObj => {}}
                    close={() => this.setState({ inputOpen: false, selection: 'none' })}
                    icon={this.state.selection}
                    open={this.state.inputOpen}
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    expenseCategories: state.expenseCategories,
    expenseSelection: state.expenseSelection,
    incomeCategories: state.incomeCategories,
    incomeSelection: state.incomeSelection,
    settings: state.settings,
})

export default connect(mapStateToProps)(Screen);