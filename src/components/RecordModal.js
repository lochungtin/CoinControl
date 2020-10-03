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
            editDate: false,
            editTitle: false,
            editDate: false,
            title: undefined,
            value: undefined,
        }
    }

    modalView = () => {
        return this.props.dark ? styles.modalViewD : styles.modalViewL;
    }

    close = () => {
        this.props.close();
        this.setState({
            editDate: false,
            editTitle: false,
            editValue: false,
        })
    }

    render() {
        return (
            <Modal animationType='slide' transparent={true} visible={this.props.open}>
                <View style={styles.modalViewContainer}>
                    <View style={{ ...this.modalView(), height: maxHeight * 2 / 3 - 10 }}>
                        <View style={styles.rows}>
                            <View style={styles.rows}>
                                <ExpandButton dark={this.props.dark} onPress={this.close} />
                                <View style={{ ...styles.roundView, ...styles.columns, backgroundColor: white, minHeight: 60 }}>
                                    {this.props.icon !== 'check-box-outline-blank' && <Icon name={this.props.icon} size={25} color={black} />}
                                    <Text style={recordModalStyles.input}>{this.props.category}</Text>
                                </View>
                                <View style={{ ...styles.roundView, ...styles.columns, backgroundColor: white, minHeight: 60 }}>
                                    <Icon name={'alpha-t-circle-outline'} size={25} color={black} />
                                    <TextInput
                                        placeholder={'Title (Optional)'}
                                        onChangeText={(text) => this.setState({ editTitle: true, title: text })}
                                        style={recordModalStyles.input}
                                        value={this.state.editTitle ? this.state.title : this.props.title}
                                    />
                                </View>
                                <View style={{ ...styles.roundView, ...styles.columns, backgroundColor: white, minHeight: 60 }}>
                                    <Icon name={'currency-usd-circle-outline'} size={25} color={black} />
                                    <TextInput
                                        keyboardType={'numeric'}
                                        onChangeText={(text) => this.setState({ editValue: true, value: text })}
                                        placeholder={'amount'}
                                        style={recordModalStyles.input}
                                        value={this.state.editValue ? this.state.value.toString() : this.props.value === undefined ? undefined : this.props.value.toString()}
                                    />
                                </View>
                                <View style={{ ...styles.roundView, ...styles.columns, backgroundColor: white, minHeight: 60 }}>
                                    <Icon name={'calendar-month'} size={25} color={black} />
                                    <View style={{ width: '100%', paddingHorizontal: '10%' }}>
                                        <DatePicker dark={this.props.dark} accent={this.props.accent} action={(date) => this.setState({ date: date, editDate: true })} date={this.state.editDate ? this.state.date : this.props.date} />
                                    </View>
                                </View>
                            </View>
                            <View style={{ height: '50%' }} />
                            <View style={{ ...styles.columns, justifyContent: 'space-between' }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.dispatch({
                                            category: this.props.category,
                                            date: this.state.editDate ? this.state.date : this.props.date,
                                            icon: this.props.icon,
                                            key: this.props.id === undefined ? moment().format() : this.props.id,
                                            title: this.state.editTitle ? this.state.title : this.props.title,
                                            type: this.props.type,
                                            value: parseFloat(this.state.editValue ? this.state.value : this.props.value),
                                        });
                                    }}
                                    style={{ ...styles.roundView, backgroundColor: this.props.accent, width: '47.5%' }}>
                                    <Text style={styles.centerTextL}>Save</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.close} style={{ ...styles.roundView, backgroundColor: white, width: '47.5%' }}>
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

