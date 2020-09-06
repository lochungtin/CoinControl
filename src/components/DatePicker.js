import React from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native';

import Calendar from './Calendar';
import { black, datePickerStyles, styles, white } from '../styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class DatePicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: this.props.date,
            open: false,
        }
    }

    render() {
        return (
            <View>
                <Modal animationType={'fade'} transparent={true} visible={this.state.open}>
                    <View style={datePickerStyles.centered}>
                        <View style={datePickerStyles.modalView}>
                            <TouchableOpacity onPress={() => this.setState({ open: false })}>
                                <Icon name={'dots-horizontal'} size={25} color={white} />
                            </TouchableOpacity>
                            <Calendar
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
                        <Text style={{ ...styles.centerText, color: black }}>Edit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}