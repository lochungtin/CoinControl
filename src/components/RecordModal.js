import moment from 'moment';
import React from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import DatePicker from '../components/DatePicker';
import { black, maxHeight, recordModalStyles, styles, white, } from '../styles';

export default class RecordModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: props.date,
            title: '',
            value: 0,
        }
    }

    modalView = () => {
        return this.props.dark ? styles.modalViewD : styles.modalViewL;
    }

    render() {
        return (
            <Modal animationType='slide' transparent={true} visible={this.props.open}>
                <View style={styles.modalViewContainer}>
                    <View style={{ ...this.modalView(), height: maxHeight * 2 / 3 - 10 }}>
                        <View style={styles.rows}>
                            <View style={styles.rows}>
                                <ExpandButton dark={this.props.dark} onPress={() => this.props.close()} />
                                <View style={{ ...styles.roundView, ...styles.columns, backgroundColor: white, minHeight: 60 }}>
                                    <Icon name={this.props.icon} size={25} color={black} />
                                    <Text style={recordModalStyles.input}>{this.props.category}</Text>
                                </View>
                                <View style={{ ...styles.roundView, ...styles.columns, backgroundColor: white, minHeight: 60 }}>
                                    <Icon name={'alpha-t-circle-outline'} size={25} color={black} />
                                    <TextInput
                                        placeholder={'Title (Optional)'}
                                        onChangeText={(text) => this.setState({ title: text })}
                                        style={recordModalStyles.input}
                                    />
                                </View>
                                <View style={{ ...styles.roundView, ...styles.columns, backgroundColor: white, minHeight: 60 }}>
                                    <Icon name={'currency-usd-circle-outline'} size={25} color={black} />
                                    <TextInput
                                        keyboardType={'numeric'}
                                        onChangeText={(text) => this.setState({ value: parseFloat(text) })}
                                        placeholder={'amount'}
                                        style={recordModalStyles.input}
                                    />
                                </View>
                                <View style={{ ...styles.roundView, ...styles.columns, backgroundColor: white, minHeight: 60 }}>
                                    <Icon name={'calendar-month'} size={25} color={black} />
                                    <View style={{ width: '100%', paddingHorizontal: '10%' }}>
                                        <DatePicker dark={this.props.dark} accent={this.props.accent} action={(date) => this.setState({ date: date })} date={this.props.date} />
                                    </View>
                                </View>
                            </View>
                            <View style={{ height: '50%' }} />
                            <View style={{ ...styles.columns, justifyContent: 'space-between' }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.dispatch({
                                            category: this.props.category,
                                            date: this.state.date,
                                            icon: this.props.icon,
                                            key: moment().format(),
                                            title: this.state.title,
                                            type: this.props.type,
                                            value: this.state.value,
                                        });
                                    }}
                                    style={{ ...styles.roundView, backgroundColor: this.props.accent, width: '47.5%' }}>
                                    <Text style={styles.centerTextL}>Save</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.close()} style={{ ...styles.roundView, backgroundColor: white, width: '47.5%' }}>
                                    <Text style={styles.centerTextL}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

