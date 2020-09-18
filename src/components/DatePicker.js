import React from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Calendar from './Calendar';
import ExpandButton from './ExpandButton';
import { datePickerStyles, styles, white } from '../styles';


export default class DatePicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: this.props.date,
            open: false,
        }
    }

    modalStyle = () => {
        return this.props.dark ? datePickerStyles.modalViewD : datePickerStyles.modalViewL;
    }

    render() {
        return (
            <View>
                <Modal animationType={'fade'} transparent={true} visible={this.state.open}>
                    <View style={datePickerStyles.centered}>
                        <View style={this.modalStyle()}>
                            <ExpandButton dark={this.props.dark} onPress={() => this.setState({ open: false })} />
                            <Calendar
                                dark={this.props.dark}
                                accent={this.props.accent}
                                data={[]}
                                onPress={(date) => {
                                    this.props.action(date);
                                    this.setState({ date: date, open: false });
                                }}
                            />
                        </View>
                    </View>
                </Modal>
                <View style={{ ...styles.columns, justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: this.props.fontSize }}>{this.state.date}</Text>
                    <TouchableOpacity
                        onPress={() => this.setState({ open: true })}
                        style={{ ...datePickerStyles.editBtn, backgroundColor: this.props.accent }}
                    >
                        <Text style={styles.centerTextL}>Edit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}