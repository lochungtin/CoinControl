import moment from 'moment';
import React from 'react';
import { TouchableOpacity, Text, } from 'react-native';
import { connect } from 'react-redux';

import { calendarStyles } from '../../styles';

class CalendarDateSelector extends React.Component {

    text = () => {
        if (this.props.day === moment().format('YYYY-MM-DD'))
            return { textAlign: 'center', color: this.props.settings.accent }
        return this.props.disabled ? this.style('disabled') : this.style('centerText');
    }

    style = styleName => calendarStyles[styleName + (this.props.settings.darkMode ? "D" : "L")];

    render() {
        return (
            <TouchableOpacity
                style={{...calendarStyles.selectionContainer, borderColor: this.props.selected ? this.props.settings.accent : 'transparent'}}
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

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(CalendarDateSelector);