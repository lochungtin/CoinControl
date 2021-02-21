import React from 'react';
import { ScrollView, Text, TouchableOpacity, View, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import ConfirmationModal from '../components/Modals/ConfirmationModal';
import CategoryModal from '../components/Modals/CategoryModal';
import ScreenHeader from '../components/ScreenHeader';
import { deleteExpenseCategory, deleteIncomeCategory, makeNullKey, removeWatchlist } from '../redux/action';
import { store } from '../redux/store';

import { white } from '../data/color';
import { NULL_KEY } from '../data/default';
import { icons } from '../data/icons';
import { categoryPromptText } from '../data/text';
import { iconSelectionScreen, styles, } from '../styles';

class Screen extends React.Component {

    constructor(props) {
        super(props);
        var opened = { inUse: false };
        for (const type of Object.keys(icons)) {
            opened[type] = true;
        }
        this.state = {
            confirmType: '',
            deleteMode: false,
            focus: '',
            inputOpen: false,
            opened: opened,
            selection: 'none',
            type: props.route.params,
            types: Object.keys(icons),
        };
    }

    catValue = key => {
        const cat = (this.state.type === 'Expense' ? this.props.expenseCategories : this.props.incomeCategories)[key];
        if (cat === undefined)
            return { color: 'transparent', iconName: 'crop-free', };
        return cat;
    }

    deleteCat = key => {
        if (this.state.deleteMode) {
            store.dispatch(makeNullKey(key));
            if (this.state.type === 'Expense') {
                if (this.props.watchlist.includes(key))
                    store.dispatch(removeWatchlist(key));
                store.dispatch(deleteExpenseCategory(key));
            }
            else
                store.dispatch(deleteIncomeCategory(key));

            this.setState({ confirmType: '', focus: '' });
        }
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

    genRnKey = () => Math.floor((1 + Math.random() * 0x10000)).toString(16);

    openIcon = open => open ? 'chevron-down' : 'chevron-right';

    openConfirmation = key => {
        if (this.state.deleteMode) {
            if (!this.props.settings.prompt.dc)
                this.setState({ confirmType: 'dc', focus: key });
            else
                this.deleteCat(key);
        }
    }

    toggleDelete = () => {
        if (!this.state.deleteMode && !this.state.opened.inUse)
            this.toggleOpen('inUse');

        this.setState({ deleteMode: !this.state.deleteMode });
    }

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
                    action={this.toggleDelete}
                    back={() => this.props.navigation.goBack()}
                    icon={'trash-can-outline'}
                    name={'Custom Categories'}
                />
                <View style={{ width: '100%' }}>
                    <TouchableOpacity onPress={() => this.toggleOpen('inUse')} style={this.style('header')}>
                        <Text style={this.style('headerText')}>IN USE</Text>
                        <Icon name={this.openIcon(this.state.opened['inUse'] || this.state.deleteMode)} size={20} color={this.style('headerText').color} />
                    </TouchableOpacity>
                    {(this.state.opened['inUse'] || this.state.deleteMode) && this.makeGrid(Object.keys(this.state.type === 'Expense' ? this.props.expenseCategories : this.props.incomeCategories).filter(key => key !== NULL_KEY))
                        .map(row => {
                            return (
                                <View key={row} style={{ ...styles.columns, height: 70, justifyContent: 'space-evenly' }}>
                                    {row.map(key => {
                                        return (
                                            <TouchableOpacity key={this.genRnKey()} onPress={() => this.openConfirmation(key)} style={iconSelectionScreen.stack}>
                                                <Icon name={this.catValue(key).iconName} size={35} color={this.catValue(key).color} style={iconSelectionScreen.stackChild} />
                                                {this.catValue(key).color !== 'transparent' && this.state.deleteMode && <View style={{ ...iconSelectionScreen.stackChild, ...iconSelectionScreen.stackDelete }}>
                                                    <Icon name={'close'} size={20} color={white} />
                                                </View>}
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                            );
                        })}
                </View>
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
                                                        <Icon name={icon} size={35} color={this.iconColor(icon)} />
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
                    close={() => this.setState({ inputOpen: false, selection: 'none' })}
                    icon={this.state.selection}
                    open={this.state.inputOpen}
                    type={this.state.type}
                />
                <ConfirmationModal
                    close={() => this.setState({ confirmType: '' })}
                    onConfirm={() => this.deleteCat(this.state.focus)}
                    open={this.state.confirmType !== ''}
                    text={categoryPromptText[this.state.confirmType]}
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    expenseCategories: state.expenseCategories,
    incomeCategories: state.incomeCategories,
    settings: state.settings,
    watchlist: state.watchlist,
})

export default connect(mapStateToProps)(Screen);