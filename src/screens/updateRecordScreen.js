import moment from 'moment';
import React from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Bubble from '../components/Bubble';
import DatePicker from '../components/DatePicker';
import { store } from '../redux/store';
import { addRecord } from '../redux/action';
import { accent, black, styles, updateRecordScreenStyles, white, } from '../styles';

class Screen extends React.Component {

    constructor(props) {
        super(props);

        var icons = props.route.params.title === 'Expense' ? props.expenseCategories : props.incomeCategories;
        if (icons[icons.length - 1].key !== 'Add')
            icons.push({ key: 'Add', iconName: 'plus' });
        this.state = {
            category: '',
            date: moment().format('YYYY-MM-DD'),
            icon: '',
            grid: [
                icons.slice(0, 4),
                icons.slice(4, 8),
                icons.slice(8, 12),
                icons.slice(12, 16),
            ],
            open: false,
            title: '',
            type: props.route.params.title,
            value: 0,
        }
    }

    render() {
        return (
            <View style={styles.screen}>
                <View style={styles.rows}>
                    <View style={{ ...styles.columns, maxHeight: 120 }}>
                        {this.state.grid[0].map(item => (
                            <View key={item.key} style={{ ...styles.rows, justifyContent: 'space-between' }}>
                                <Bubble
                                    color={accent}
                                    iconName={item.iconName}
                                    iconsSize={25}
                                    onPress={() => this.setState({ category: item.key, icon: item.iconName, open: true })}
                                    selected={this.state.category === item.key}
                                    size={35}
                                />
                                <Text style={styles.centerText}>{item.key}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={{ ...styles.columns, maxHeight: 120 }}>
                        {this.state.grid[1].map(item => (
                            <View key={item.key} style={{ ...styles.rows, justifyContent: 'space-between' }}>
                                <Bubble
                                    color={accent}
                                    iconName={item.iconName}
                                    iconsSize={25}
                                    onPress={() => {
                                        if (item.key === 'Add')
                                            this.props.navigation.navigate('Category', { title: this.props.route.params.title });
                                        else
                                            this.setState({ category: item.key, icon: item.iconName, open: true });
                                    }}
                                    selected={this.state.category === item.key}
                                    size={35}
                                />
                                <Text style={styles.centerText}>{item.key}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={{ ...styles.columns, maxHeight: 120 }}>
                        {this.state.grid[2].map(item => (
                            <View key={item.key} style={{ ...styles.rows, justifyContent: 'space-between' }}>
                                <Bubble
                                    color={accent}
                                    iconName={item.iconName}
                                    iconsSize={25}
                                    onPress={() => {
                                        if (item.key === 'Add')
                                            this.props.navigation.navigate('Category', { title: this.props.route.params.title });
                                        else
                                            this.setState({ category: item.key, icon: item.iconName, open: true });
                                    }}
                                    selected={this.state.category === item.key}
                                    size={35}
                                />
                                <Text style={styles.centerText}>{item.key}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={{ ...styles.columns, maxHeight: 120 }}>
                        {this.state.grid[3].map(item => (
                            <View key={item.key} style={{ ...styles.rows, justifyContent: 'space-between' }}>
                                <Bubble
                                    color={accent}
                                    iconName={item.iconName}
                                    iconsSize={25}
                                    onPress={() => {
                                        if (item.key === 'Add')
                                            this.props.navigation.navigate('Category', { title: this.props.route.params.title });
                                        else
                                            this.setState({ category: item.key, icon: item.iconName, open: true });
                                    }}
                                    selected={this.state.category === item.key}
                                    size={35}
                                />
                                <Text style={styles.centerText}>{item.key}</Text>
                            </View>
                        ))}
                    </View>
                </View>
                {!this.state.open &&
                    <TouchableOpacity onPress={this.props.navigation.goBack} style={{ ...styles.roundView, backgroundColor: white }}>
                        <Text style={{ ...styles.centerText, color: black }}>Cancel</Text>
                    </TouchableOpacity>
                }
                <Modal animationType='slide' transparent={true} visible={this.state.open}>
                    <View style={updateRecordScreenStyles.modalViewContainer}>
                        <View style={updateRecordScreenStyles.modalView}>
                            <View style={styles.rows}>
                                <View style={styles.rows}>
                                    <TouchableOpacity onPress={() => this.setState({ category: '', open: false })}>
                                        <Icon name={'dots-horizontal'} size={25} color={white} />
                                    </TouchableOpacity>
                                    <View style={{ ...styles.roundView, ...styles.columns, backgroundColor: white, minHeight: 60 }}>
                                        {this.state.icon !== '' &&
                                            <Icon name={this.state.icon} size={25} color={black} />
                                        }
                                        <Text style={{ ...styles.centerText, color: black, width: '100%' }}>{this.state.category}</Text>
                                    </View>
                                    <View style={{ ...styles.roundView, ...styles.columns, backgroundColor: white, minHeight: 60 }}>
                                        <Icon name={'alpha-t-circle-outline'} size={25} color={black} />
                                        <TextInput
                                            placeholder={'Title (Optional)'}
                                            onChangeText={(text) => this.setState({ title: text })}
                                            style={{ ...styles.centerText, color: black, width: '100%' }}
                                        />
                                    </View>
                                    <View style={{ ...styles.roundView, ...styles.columns, backgroundColor: white, minHeight: 60 }}>
                                        <Icon name={'currency-usd-circle-outline'} size={25} color={black} />
                                        <TextInput
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.setState({ value: parseFloat(text) })}
                                            placeholder={'amount'}
                                            style={{ ...styles.centerText, color: black, width: '100%' }}
                                        />
                                    </View>
                                    <View style={{ ...styles.roundView, ...styles.columns, backgroundColor: white, minHeight: 60 }}>
                                        <Icon name={'calendar-month'} size={25} color={black} />
                                        <View style={{ width: '100%', paddingHorizontal: '10%' }}>
                                            <DatePicker accent={accent} action={(date) => this.setState({ date: date })} date={this.state.date} />
                                        </View>
                                    </View>
                                </View>
                                <View style={{ height: '50%' }} />
                                <View style={{...styles.columns, justifyContent: 'space-between'}}>
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
                                        style={{ ...styles.roundView, backgroundColor: accent, width: '47.5%' }}>
                                        <Text style={{ ...styles.centerText, color: black }}>Save</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.setState({ category: '', open: false })} style={{ ...styles.roundView, backgroundColor: white, width: '47.5%' }}>
                                        <Text style={{ ...styles.centerText, color: black }}>Cancel</Text>
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
})

export default connect(mapStateToProps)(Screen);