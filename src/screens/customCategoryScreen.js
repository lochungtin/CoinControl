import React from 'react';
import { FlatList, Modal, TouchableOpacity, Text, TextInput, View, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import CategoryItem from '../components/CategoryItem';
import ExpandButton from '../components/ExpandButton';
import ScreenHeader from '../components/ScreenHeader';
import { customCategoryIconList } from '../default';
import { addExpenseCategory, addIncomeCategory, deleteExpenseCategory, deleteIncomeCategory, } from '../redux/action';
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

    color = () => {
        return this.props.settings.darkMode ? white : black;
    }

    data = () => {
        return this.props.route.params.title === 'Expense' ? this.props.expenseCategories : this.props.incomeCategories;
    }

    modal = () => {
        return this.props.settings.darkMode ? categoryStyles.modalViewD : categoryStyles.modalViewL;
    }

    render() {
        return (
            <View style={this.props.settings.darkMode ? styles.screenD : styles.screenL}>
                <ScreenHeader dark={this.props.settings.darkMode} action={() => this.props.navigation.goBack()} name={'Edit ' + this.props.route.params.title + ' Category'} />
                <View style={{ height: '5%' }} />
                <Text style={{ color: this.color(), fontSize: 15, width: '85%' }}>Categories: (max 16)</Text>
                <View style={{ height: '2%' }} />
                <FlatList
                    data={this.data()}
                    renderItem={({ item }) =>
                        <CategoryItem
                            dark={this.props.settings.darkMode}
                            accent={this.props.settings.accent}
                            expand={this.state.deleting}
                            item={item}
                        />
                    }
                />
                <View style={{ height: '15%' }} />
                <View style={{ ...styles.columns, justifyContent: 'space-between', width: '25%' }}>
                    <TouchableOpacity onPress={() => this.setState({ adding: true })}>
                        <Icon name={'plus'} size={30} color={this.color()} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ deleting: !this.state.deleting })}>
                        <Icon name={'trash-can'} size={30} color={this.state.deleting ? this.props.settings.accent : this.color()} />
                    </TouchableOpacity>
                </View>
                <Modal animationType={'slide'} visible={this.state.adding} transparent={true}>
                    <View style={styles.modalViewContainer}>
                        <View style={{ ...styles.modalView, height: 175 }}>
                            <View style={styles.rows}>
                                <ExpandButton dark={this.props.settings.darkMode} onPress={() => this.setState({ adding: false })} />
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
                                                        store.dispatch(addExpenseCategory({
                                                            default: false,
                                                            key: this.state.newName,
                                                            iconName: iconName,
                                                        }));
                                                    }
                                                    else {
                                                        var iconName = customCategoryIconList[this.props.expenseCategories.length - 4];
                                                        store.dispatch(addIncomeCategory({
                                                            default: false,
                                                            key: this.state.newName,
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
    incomeCategories: state.incomeCategories,
    settings: state.settings
})

export default connect(mapStateToProps)(Screen);