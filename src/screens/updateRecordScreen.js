import moment from 'moment';
import React from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Bubble from '../components/Bubble';
import DatePicker from '../components/DatePicker';
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
                <ExpandButton dark={this.props.settings.darkMode} onPress={() => this.props.navigation.navigate('Category', {title: this.props.route.params.title})}/>
                {!this.state.open &&
                    <TouchableOpacity onPress={this.props.navigation.goBack} style={this.props.settings.darkMode ? recordStyles.cancelBtnD : recordStyles.cancelBtnL}>
                        <Text style={styles.centerTextL}>Cancel</Text>
                    </TouchableOpacity>
                }
                <Modal animationType='slide' transparent={true} visible={this.state.open}>
                    <View style={styles.modalViewContainer}>
                        <View style={{ ...styles.modalView, height: maxHeight * 3 / 4 - 10 }}>
                            <View style={styles.rows}>
                                <View style={styles.rows}>
                                    <ExpandButton dark={this.props.settings.darkMode} onPress={() => this.setState({ category: '', open: false })} />
                                    <View style={{ ...styles.roundView, ...styles.columns, backgroundColor: white, minHeight: 60 }}>
                                        {this.state.icon !== '' &&
                                            <Icon name={this.state.icon} size={25} color={black} />
                                        }
                                        <Text style={recordStyles.input}>{this.state.category}</Text>
                                    </View>
                                    <View style={{ ...styles.roundView, ...styles.columns, backgroundColor: white, minHeight: 60 }}>
                                        <Icon name={'alpha-t-circle-outline'} size={25} color={black} />
                                        <TextInput
                                            placeholder={'Title (Optional)'}
                                            onChangeText={(text) => this.setState({ title: text })}
                                            style={recordStyles.input}
                                        />
                                    </View>
                                    <View style={{ ...styles.roundView, ...styles.columns, backgroundColor: white, minHeight: 60 }}>
                                        <Icon name={'currency-usd-circle-outline'} size={25} color={black} />
                                        <TextInput
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.setState({ value: parseFloat(text) })}
                                            placeholder={'amount'}
                                            style={recordStyles.input}
                                        />
                                    </View>
                                    <View style={{ ...styles.roundView, ...styles.columns, backgroundColor: white, minHeight: 60 }}>
                                        <Icon name={'calendar-month'} size={25} color={black} />
                                        <View style={{ width: '100%', paddingHorizontal: '10%' }}>
                                            <DatePicker accent={this.props.settings.accent} action={(date) => this.setState({ date: date })} date={this.state.date} />
                                        </View>
                                    </View>
                                </View>
                                <View style={{ height: '50%' }} />
                                <View style={{ ...styles.columns, justifyContent: 'space-between' }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            store.dispatch(addRecord({
                                                category: this.state.category,
                                                date: this.state.date,
                                                icon: this.state.icon,
                                                key: moment().format(),
                                                title: this.state.title,
                                                type: this.state.type,
                                                value: this.state.value,
                                            }));
                                            this.props.navigation.goBack();
                                        }}
                                        style={{ ...styles.roundView, backgroundColor: this.props.settings.accent, width: '47.5%' }}>
                                        <Text style={styles.centerTextL}>Save</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.setState({ category: '', open: false })} style={{ ...styles.roundView, backgroundColor: white, width: '47.5%' }}>
                                        <Text style={styles.centerTextL}>Cancel</Text>
                                    </TouchableOpacity>
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