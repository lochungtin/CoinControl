import React from 'react';
import { FlatList, Modal, TouchableOpacity, Text, TextInput, View, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import CategoryItem from '../components/CategoryItem';
import ExpandButton from '../components/ExpandButton';
import ScreenHeader from '../components/ScreenHeader';
import { customCategoryIconList } from '../data/default';
import { addExpenseCategory, addIncomeCategory, deleteExpenseCategory, deleteIncomeCategory, resetKey, updateExpenseSelection, updateIncomeSelection, } from '../redux/action';
import { store } from '../redux/store';
import { black, categoryStyles, styles, white, } from '../styles';



class Screen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            adding: false,
            deleting: false,
            newName: '',
        }
    }

    centerText = () => {
        return this.props.settings.darkMode ? styles.centerTextD : styles.centerTextL;
    }

    changeName = (list, ogName, newName, modifier) => {
        if (!this.checkExist(list, newName))
            return newName;
        else {
            newName = ogName + (++modifier);
            return this.changeName(list, ogName, newName, modifier);
        }
    }

    checkExist = (list, name) => {
        for (const category of list) {
            if (category.key === name)
                return true;
        }
        return false;
    }

    color = () => {
        return this.props.settings.darkMode ? white : black;
    }

    data = () => {
        return this.props.route.params.title === 'Expense' ? this.props.expenseCategories : this.props.incomeCategories;
    }

    list = () => {
        return this.props.settings.darkMode ? categoryStyles.listD : categoryStyles.listL;
    }

    modalView = () => {
        return this.props.settings.darkMode ? styles.modalViewD : styles.modalViewL;
    }

    render() {
        return (
            <View style={this.props.settings.darkMode ? styles.screenD : styles.screenL}>
                <ScreenHeader dark={this.props.settings.darkMode} action={() => this.props.navigation.goBack()} name={'Edit ' + this.props.route.params.title + ' Category'} />
                <View style={{ height: '3%' }} />
                <Text style={{ color: this.color(), fontSize: 15, width: '85%' }}>Categories: (max 16)</Text>
                <Icon name={'chevron-up'} size={25} color={this.color()} />
                <FlatList
                    data={this.data()}
                    renderItem={({ item }) =>
                        <CategoryItem
                            dark={this.props.settings.darkMode}
                            accent={this.props.settings.accent}
                            action={(key) => {
                                if (this.props.route.params.title === 'Expense') {
                                    store.dispatch(deleteExpenseCategory(key));
                                    store.dispatch(resetKey(key));
                                    var temp = [...this.props.expenseSelection];
                                    var position = temp.indexOf(key);
                                    if (position !== -1) {
                                        temp.splice(position, 1);
                                        store.dispatch(updateExpenseSelection(temp));
                                    }
                                }
                                else {
                                    store.dispatch(deleteIncomeCategory(key));
                                    store.dispatch(resetKey(key));
                                    var temp = [...this.props.incomeSelection];
                                    var position = temp.indexOf(key);
                                    if (position !== -1) {
                                        temp.splice(position, 1);
                                        store.dispatch(updateIncomeSelection(temp));
                                    }
                                }
                            }}
                            expand={this.state.deleting}
                            item={item}
                        />
                    }
                    style={this.list()}
                />
                <Icon name={'chevron-down'} size={25} color={this.color()} />
                <View style={{ ...styles.columns, justifyContent: 'space-between', width: '25%' }}>
                    <TouchableOpacity onPress={() => {
                        if (this.data().length < 16)
                            this.setState({ adding: true });
                    }}>
                        <Icon name={'plus'} size={30} color={this.color()} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ deleting: !this.state.deleting })}>
                        <Icon name={'trash-can'} size={30} color={this.state.deleting ? this.props.settings.accent : this.color()} />
                    </TouchableOpacity>
                </View>
                <Modal animationType={'slide'} visible={this.state.adding} transparent={true}>
                    <View style={styles.modalViewContainer}>
                        <View style={{ ...this.modalView(), height: 175 }}>
                            <View style={styles.rows}>
                                <ExpandButton onPress={() => this.setState({ adding: false })} />
                                <View style={{ ...styles.columns, ...styles.roundView, backgroundColor: white, maxHeight: 60, width: '95%' }}>
                                    <Icon name={'chevron-right-circle-outline'} size={25} color={black} />
                                    <TextInput onChangeText={(text) => this.setState({ newName: text })} placeholder={'Name'} style={{ paddingHorizontal: 20 }} />
                                </View>
                                <View style={styles.columns}>
                                    <View style={styles.columns}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                if (this.state.newName !== '') {
                                                    if (this.props.route.params.title === 'Expense') {
                                                        var iconName = customCategoryIconList[this.props.expenseCategories.length - 8];
                                                        var key = this.changeName(this.props.expenseCategories, this.state.newName, this.state.newName, 0);
                                                        console.log(key);
                                                        store.dispatch(addExpenseCategory({
                                                            default: false,
                                                            key: key,
                                                            iconName: iconName,
                                                        }));
                                                    }
                                                    else {
                                                        var iconName = customCategoryIconList[this.props.incomeCategories.length - 5];
                                                        var key = this.changeName(this.props.incomeCategories, this.state.newName, this.state.newName, 0);
                                                        store.dispatch(addIncomeCategory({
                                                            default: false,
                                                            key: key,
                                                            iconName: iconName,
                                                        }));
                                                    }
                                                }
                                                this.setState({ adding: false });
                                            }}
                                            style={{ ...styles.roundView, backgroundColor: this.props.settings.accent, width: '45%' }}>
                                            <Text style={styles.centerTextL}>Confirm</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.setState({ adding: false })} style={this.props.settings.darkMode ? categoryStyles.cancelBtnD : categoryStyles.cancelBtnL}>
                                            <Text style={styles.centerTextL}>Cancel</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
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