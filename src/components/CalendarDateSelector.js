import moment from 'moment';
import React from 'react';
import { TouchableOpacity, Text, } from 'react-native';

import { calendarStyles, styles, } from '../styles';

export default class CalendarDateSelector extends React.Component {

    text = () => {
        if (this.props.day === moment().format('YYYY-MM-DD'))
            return { textAlign: 'center', color: this.props.accent }
        if (this.props.dark)
            return this.props.disabled ? calendarStyles.disabledD : styles.centerTextD
        return this.props.disabled ? calendarStyles.disabledL : styles.centerTextL
    }

    render() {
        return (
            <TouchableOpacity
                style={calendarStyles.selectionContainer}
                onPress={() => {
                    if (!this.props.disabled)
                        this.props.onPress(this.props.day);
                }}
            >
                <Text style={this.text()}>{parseInt(this.props.day.substring(8, 10))}</Text>
            </TouchableOpacity>
        )
    }
}