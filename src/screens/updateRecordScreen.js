import moment from 'moment';
import React from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Bubble from '../components/Bubble';
import DatePicker from '../components/DatePicker';
import RecordModal from '../components/RecordModal';
import ScreenHeader from '../components/ScreenHeader';
import { store } from '../redux/store';
import { addRecord } from '../redux/action';
import { black, maxHeight, recordStyles, styles, white, } from '../styles';
import ExpandButton from '../components/ExpandButton';

class Screen extends React.Component {

    constructor(props) {
        super(props);
        var categories = props.route.params.title === 'Expense' ? props.expenseCategories : props.incomeCategories;
        this.state = {
            category: '',
            date: moment().format('YYYY-MM-DD'),
            icon: '',
            grid: [
                categories.slice(0, 4),
                categories.slice(4, 8),
                categories.slice(8, 12),
                categories.slice(12, 16),
            ],
            open: false,
            title: '',
            type: props.route.params.title,
            value: 0,
        }
    }

    centerText = () => {
        return this.props.settings.darkMode ? styles.centerTextD : styles.centerTextL;
    }

    render() {
        return (
            <View style={this.props.settings.darkMode ? styles.screenD : styles.screenL}>
                <ScreenHeader dark={this.props.settings.darkMode} action={() => this.props.navigation.goBack()} name={this.props.route.params.title} />
                <View style={styles.rows}>
                    <View style={{ ...styles.columns, maxHeight: 120 }}>
                        {this.state.grid[0].map(item => (
                            <View key={item.key} style={{ ...styles.rows, justifyContent: 'space-between' }}>
                                <Bubble
                                    color={this.props.settings.accent}
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
                    <View style={{ ...styles.columns, maxHeight: 120 }}>
                        {this.state.grid[1].map(item => (
                            <View key={item.key} style={{ ...styles.rows, justifyContent: 'space-between' }}>
                                <Bubble
                                    color={this.props.settings.accent}
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
                    <View style={{ ...styles.columns, maxHeight: 120 }}>
                        {this.state.grid[2].map(item => (
                            <View key={item.key} style={{ ...styles.rows, justifyContent: 'space-between' }}>
                                <Bubble
                                    color={this.props.settings.accent}
                                    iconName={item.iconName}
                                    iconSize={25}
                                    onPress={() =>
                                        this.setState({ category: item.key, icon: item.iconName, open: true })
                                    }
                                    selected={this.state.category === item.key}
                                    size={35}
                                />
                                <Text style={this.centerText()}>{item.key}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={{ ...styles.columns, maxHeight: 120 }}>
                        {this.state.grid[3].map(item => (
                            <View key={item.key} style={{ ...styles.rows, justifyContent: 'space-between' }}>
                                <Bubble
                                    color={this.props.settings.accent}
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
                </View>
                <ExpandButton dark={this.props.settings.darkMode} onPress={() => this.props.navigation.navigate('Category', { title: this.props.route.params.title })} />
                {!this.state.open &&
                    <TouchableOpacity onPress={this.props.navigation.goBack} style={this.props.settings.darkMode ? recordStyles.cancelBtnD : recordStyles.cancelBtnL}>
                        <Text style={styles.centerTextL}>Cancel</Text>
                    </TouchableOpacity>
                }
                <RecordModal
                    dark={this.props.settings.darkMode}
                    accent={this.props.settings.accent}
                    category={this.state.category}
                    close={() => this.setState({ category: '', open: false })}
                    date={moment().format('YYYY-MM-DD')}
                    dispatch={record => {
                        store.dispatch(addRecord(record));
                        this.setState({ category: '', open: false });
                    }}
                    icon={this.state.icon}
                    open={this.state.open}
                    type={this.props.route.params.title}
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