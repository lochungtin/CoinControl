import React from 'react';
import { ScrollView, Text, TouchableOpacity, View, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import ConfirmationModal from '../components/Modals/ConfirmationModal';
import CategoryModal from '../components/Modals/CategoryModal';
import ScreenHeader from '../components/ScreenHeader';
import { deleteExpenseCategory, deleteIncomeCategory, makeNullKey, } from '../redux/action';
import { store } from '../redux/store';

import { white } from '../data/color';
import { NULL_KEY } from '../data/default';
import { icons } from '../data/icons';
import { categoryPromptText } from '../data/text';
import { RNKey } from '../functions/GenKey';
import { iconSelectionScreen, styles, } from '../styles';


class Screen extends React.Component {

    constructor(props) {
        super(props);
        let opened = { inUse: false };
        for (const type of Object.keys(icons))
            opened[type] = true;

        this.state = {
            confirmType: '',
            deleteMode: false,
            focus: '',
            inputOpen: false,
            opened,
            selection: 'none',
            type: props.route.params,
            types: Object.keys(icons),
        };
    }

    catValue = key => (this.state.type === 'Expense' ? this.props.expenseCategories : this.props.incomeCategories)[key] || { color: 'transparent', iconName: 'crop-free', };

    deleteCat = key => {
        if (this.state.deleteMode) {
            store.dispatch(makeNullKey(key));
            store.dispatch(this.state.type === 'Expense' ? deleteExpenseCategory(key) : deleteIncomeCategory(key));

            this.setState({ confirmType: '', focus: '' });
        }
    }

    makeGrid = arr => {
        let grid = [];
        for (let i = 0; i < arr.length; i += 6) {
            let row = arr.slice(i, i + 6);
            let filler = [];
            for (let j = 0; j < 6 - row.length; j++)
                filler.push('numeric-' + j);
            
            grid.push([...row, ...filler]);
        }
        return grid;
    }

    iconColor = icon => icon.startsWith('numeric') ? 'transparent' : this.props.settings.accent;

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
        let newState = { ...this.state.opened };
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
                                <View key={RNKey()} style={{ ...styles.columns, height: 70, justifyContent: 'space-evenly' }}>
                                    {row.map(key => {
                                        return (
                                            <TouchableOpacity key={RNKey()} onPress={() => this.openConfirmation(key)} style={iconSelectionScreen.stack}>
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
                            <View key={RNKey()}>
                                <TouchableOpacity onPress={() => this.toggleOpen(type)} style={this.style('header')}>
                                    <Text style={this.style('headerText')}>{type.toUpperCase()}</Text>
                                    <Icon name={this.openIcon(this.state.opened[type])} size={20} color={this.style('headerText').color} />
                                </TouchableOpacity>
                                {this.state.opened[type] && this.makeGrid(icons[type]).map(row => {
                                    return (
                                        <View key={RNKey()} style={{ ...styles.columns, height: 70, justifyContent: 'space-evenly' }}>
                                            {row.map(icon => {
                                                return (
                                                    <TouchableOpacity key={RNKey()} onPress={() => this.setState({ inputOpen: true, selection: icon, })}>
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