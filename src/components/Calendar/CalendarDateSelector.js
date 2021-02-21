import moment from 'moment';
import React from 'react';
import { TouchableOpacity, Text, } from 'react-native';
import { connect } from 'react-redux';

import { calendarStyles } from '../../styles';

class CalendarDateSelector extends React.Component {

    onPress = () => {
        if (!this.props.disabled)
            this.props.onPress(this.props.day);
    }

    text = () => {
        if (this.props.day === moment().format('YYYY-MM-DD') && !this.props.disabled)
            return { color: this.props.settings.accent, textAlign: 'center', };
        return this.props.disabled ? this.style('disabled') : this.style('centerText');
    }

    render() {
        return (
            <TouchableOpacity onPress={this.onPress} style={{ ...calendarStyles.selectionContainer, borderColor: this.props.selected && !this.props.disabled ? this.props.settings.accent : 'transparent' }}>
                <Text style={this.text()}>
                    {parseInt(this.props.day.substring(8, 10))}
                </Text>
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(CalendarDateSelector);