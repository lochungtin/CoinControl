import moment from 'moment';
import React from 'react';
import { TouchableOpacity, Text, } from 'react-native';

import { bgColor, calendarStyles, lightGrey, styles, white, } from '../styles';

export default class CalendarDateSelector extends React.Component {
    render() {
        return (
            <TouchableOpacity
                style={{ ...calendarStyles.selectionContainer, backgroundColor: this.props.selected === this.props.day ? this.props.color : bgColor }}
                onPress={() => {
                    if (!this.props.disabled)
                        this.props.onPress(this.props.day);
                }}
            >
                <Text style={{
                    ...styles.centerText,
                    color: this.props.day === moment().format('YYYY-MM-DD') ? this.props.color : (this.props.disabled ? lightGrey : white),
                    fontSize: this.props.fontSize
                }}>
                    {parseInt(this.props.day.substring(8, 10))}
                </Text>
            </TouchableOpacity>
        )
    }
}