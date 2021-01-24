import moment from 'moment';
import React from 'react';
import { Text, View, } from 'react-native';
import { connect } from 'react-redux';

import Bubble from '../components/Bubble';
import RecordModal from '../components/Modals/RecordModal';
import ScreenHeader from '../components/ScreenHeader';
import { store } from '../redux/store';
import { addRecord } from '../redux/action';

import { styles } from '../styles';

class Screen extends React.Component {

    constructor(props) {
        super(props);
        var categories = props.route.params === 'Expense' ? props.expenseCategories : props.incomeCategories;
        this.state = {
            categories: categories,
            catKey: '',
            date: moment().format('YYYY-MM-DD'),
            grid: this.makeGrid(Object.keys(categories)),
            open: false,
            type: props.route.params,
            value: 0,
        }
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', this.update);
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    centerText = () => this.props.settings.darkMode ? styles.centerTextD : styles.centerTextL;

    makeGrid = arr => {
        arr.sort((a, b) => a > b);

        var grid = [];
        for (let i = 0; i < arr.length; i += 4)
            grid.push(arr.slice(i, i + 4));

        if (arr.length % 4 !== 0)
            for (let j = grid[grid.length - 1].length; j < 4; j++)
                grid[grid.length - 1].push('');

        return grid;
    }

    genRnKey = () => Math.floor((1 + Math.random() * 0x10000)).toString(16);

    update = () => {
        var categories = this.props.route.params === 'Expense' ? this.props.expenseCategories : this.props.incomeCategories;
        this.setState({
            catKey: '',
            categories: categories,
            grid: this.makeGrid(Object.keys(categories)),
            open: false,
        });
    }

    render() {
        return (
            <View style={this.props.settings.darkMode ? styles.screenD : styles.screenL}>
                <ScreenHeader
                    action={() => this.props.navigation.navigate('Icons', this.props.route.params)}
                    back={() => this.props.navigation.goBack()}
                    icon={'plus'}
                    name={this.props.route.params}
                />
                <View style={styles.rows}>
                    {this.state.grid.map(row => {
                        return (
                            <View style={{ ...styles.columns, height: 100 }} key={this.genRnKey()}>
                                {row.map(key => (
                                    <View style={{ ...styles.rows, justifyContent: 'space-between', width: "25%" }} key={this.genRnKey()}>
                                        {key !== '' ?
                                            <View style={{ ...styles.rows, justifyContent: 'space-between' }}>
                                                <Bubble
                                                    iconColor={this.state.categories[key].color}
                                                    iconName={this.state.categories[key].iconName}
                                                    iconSize={25}
                                                    onPress={() => this.setState({ catKey: key, open: true })}
                                                    selected={this.state.catKey === key}
                                                    size={35}
                                                />
                                                <Text style={this.centerText()}>{this.state.categories[key].name}</Text>
                                            </View> :
                                            <View style={{ ...styles.rows, justifyContent: 'space-between', width: "25%" }} />
                                        }
                                    </View>
                                ))}
                            </View>
                        );
                    })}
                </View>

                <RecordModal
                    close={this.update}
                    item={{
                        catKey: this.state.catKey,
                        date: moment().format('YYYY-MM-DD'),
                        type: this.props.route.params,
                    }}
                    onConfirm={record => {
                        store.dispatch(addRecord(record));
                        this.setState({ catKey: '', open: false });
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