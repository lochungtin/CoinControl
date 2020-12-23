import React from 'react'
import { Modal, Text, TouchableOpacity, View, } from 'react-native';
import { connect } from 'react-redux';

import Calendar from './Calendar';
import ExpandButton from './ExpandButton';
import { datePickerStyles, styles, } from '../styles';


class DatePicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: this.props.date,
            open: false,
        }
    }

    modalStyle = () => {
        return this.props.settings.darkMode ? datePickerStyles.modalViewD : datePickerStyles.modalViewL;
    }

    render() {
        return (
            <View>
                <Modal animationType={'fade'} transparent={true} visible={this.state.open}>
                    <View style={datePickerStyles.modalViewContainer}>
                        <View style={this.modalStyle()}>
                            <ExpandButton onPress={() => this.setState({ open: false })} />
                            <Calendar
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
                        style={{ ...datePickerStyles.editBtn, backgroundColor: this.props.settings.accent }}
                    >
                        <Text style={styles.centerTextL}>Edit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(DatePicker);