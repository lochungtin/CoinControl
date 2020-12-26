import moment from 'moment';
import React from 'react';
import { Text, View, } from 'react-native';
import { connect } from 'react-redux';

import Bubble from '../components/Bubble';
import RecordModal from '../components/RecordModal';
import ScreenHeader from '../components/ScreenHeader';
import { store } from '../redux/store';
import { addRecord } from '../redux/action';

import { styles, } from '../styles';

class Screen extends React.Component {

    constructor(props) {
        super(props);
        var categories = props.route.params.title === 'Expense' ? props.expenseCategories : props.incomeCategories;
        this.state = {
            category: '',
            date: moment().format('YYYY-MM-DD'),
            icon: 'account',
            grid: [
                [0, ...categories.slice(0, 4)],
                [1, ...categories.slice(4, 8)],
                [2, ...categories.slice(8, 12)],
                [3, ...categories.slice(12, 16)],
            ],
            open: false,
            title: '',
            type: props.route.params.title,
            value: 0,
        }
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            var categories = this.props.route.params.title === 'Expense' ? this.props.expenseCategories : this.props.incomeCategories;
            this.setState({
                grid: [
                    [0, ...categories.slice(0, 4)],
                    [1, ...categories.slice(4, 8)],
                    [2, ...categories.slice(8, 12)],
                    [3, ...categories.slice(12, 16)],
                ],
            });
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    centerText = () => {
        return this.props.settings.darkMode ? styles.centerTextD : styles.centerTextL;
    }

    render() {
        return (
            <View style={this.props.settings.darkMode ? styles.screenD : styles.screenL}>
                <ScreenHeader 
                    action={() => this.props.navigation.navigate('Icons')} 
                    back={() => this.props.navigation.goBack()} 
                    name={this.props.route.params.title} 
                />
                <View style={styles.rows}>
                    {this.state.grid.map(row => {
                        return (
                            <View style={{ ...styles.columns, maxHeight: 120 }} key={row[0]}>
                                {row.slice(1).map(item => (
                                    <View key={item.key} style={{ ...styles.rows, justifyContent: 'space-between' }}>
                                        <Bubble
                                            iconColor={this.props.settings.accent}
                                            iconName={item.iconName}
                                            iconSize={25}
                                            onPress={() => this.setState({ category: item.key, icon: item.iconName, open: true })}
                                            selected={this.state.category === item.key}
                                            size={35}
                                        />
                                        <Text style={this.centerText()}>{item.key}</Text>
                                    </View>
                                ))}
                            </View>
                        )
                    })}
                </View>

                <RecordModal
                    close={() => this.setState({ category: '', open: false })}
                    item={{
                        category: this.state.category,
                        date: moment().format('YYYY-MM-DD'),
                        icon: this.state.icon,
                        type: this.props.route.params.title,
                    }}
                    onConfirm={record => {
                        store.dispatch(addRecord(record));
                        this.setState({ category: '', open: false });
                        this.props.navigation.goBack();
                    }}
                    open={this.state.open}
                />
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