import moment from 'moment';
import React from 'react';
import { Text, TouchableOpacity, View, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import CalendarDateSelector from './CalendarDateSelector';
import { calendarStyles, styles, } from '../../styles';

class Calendar extends React.Component {

    constructor(props) {
        super(props);
        const pos = props.date || moment().format('YYYY-MM-DD');

        this.state = {
            grid: [],
            month: parseInt(pos.substring(5, 7)),
            pos: pos,
            selectedRow: '',
            year: parseInt(pos.substring(0, 4)),
        }
        this.days = [
            { key: 0, label: 'S' },
            { key: 1, label: 'M' },
            { key: 2, label: 'T' },
            { key: 3, label: 'W' },
            { key: 4, label: 'T' },
            { key: 5, label: 'F' },
            { key: 6, label: 'S' }
        ];
        this.disabled = [n => n > 7, () => false, () => false, n => n < 7, n => n < 7, n => n < 7];
    }

    componentDidMount() {
        this.updateRows(this.state.month, this.state.year);
    }

    addZero = num => num < 10 ? '0' + num : num;

    create2DArray = (rows, columns) => {
        var arr = new Array(rows);
        for (var i = 0; i < rows; i++)
            arr[i] = new Array(columns);

        return arr;
    }

    findMonthSize = (year, month) => {
        if ([1, 3, 5, 7, 8, 10, 12].includes(month))
            return 31;
        if ([4, 6, 9, 11].includes(month))
            return 30;
        if (this.isLeapYear(year))
            return 29;
        return 28;
    }

    isLeapYear = yearStr => {
        const year = parseInt(yearStr);
        return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
    }

    makeDay = date => this.state.year + '-' + this.addZero(this.state.month) + '-' + this.addZero(date);

    selectedDay = (row, date) => {
        this.setState({ selectedDay: date, selectedRow: row });
        this.props.onPress(date);
    }

    updateRows = (month, year) => {
        const preMonthDayLeft = moment(year + '-' + this.addZero(month) + '-01').weekday();
        const prevMonth = month === 1 ? 12 : month - 1;
        const prevMonthDay = this.findMonthSize(prevMonth === 12 ? year - 1 : year, prevMonth);;
        const currMonthDay = this.findMonthSize(year, month);

        var grid = this.create2DArray(6, 7);

        var i, row, column, rowMax;

        rowMax = Math.floor((preMonthDayLeft + currMonthDay + 6) / 7);
        for (i = 0; i < rowMax * 7; i++) {
            row = Math.floor(i / 7);
            column = i % 7;
            if (row == 0 && i < preMonthDayLeft)
                grid[row][column] = prevMonthDay - (preMonthDayLeft - 1 - i);
            else if (i < preMonthDayLeft + currMonthDay)
                grid[row][column] = i - preMonthDayLeft + 1;
            else
                grid[row][column] = i - (preMonthDayLeft + currMonthDay) + 1;
        }

        this.setState({ grid, month, year });
    }

    render() {
        return (
            <View style={calendarStyles.container}>
                <View style={{ ...styles.columns, height: 45, justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        onPress={() => {
                            if (!(this.state.year === 1970 && this.state.month === 1)) {
                                const newMonth = (this.state.month + 11) % 12 === 0 ? 12 : (this.state.month + 11) % 12;
                                const newYear = newMonth === 12 ? this.state.year - 1 : this.state.year;
                                this.updateRows(newMonth, newYear);
                            }
                        }}
                    >
                        <Icon name={'menu-left-outline'} size={25} color={this.props.settings.accent} />
                    </TouchableOpacity>
                    <Text style={this.props.settings.darkMode ? calendarStyles.titleD : calendarStyles.titleL}>
                        {moment().month(this.state.month - 1).format('MMMM') + ' ' + this.state.year}
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            const newMonth = (this.state.month + 1) % 12 === 0 ? 12 : (this.state.month + 1) % 12;
                            const newYear = newMonth === 1 ? this.state.year + 1 : this.state.year;
                            this.updateRows(newMonth, newYear);
                        }}
                    >
                        <Icon name={'menu-right-outline'} size={25} color={this.props.settings.accent} />
                    </TouchableOpacity>
                </View>
                <View style={{ ...styles.columns, minHeight: 20, justifyContent: 'space-between' }} >
                    {this.days.map(item => {
                        return (
                            <Text key={item.key} style={{ ...calendarStyles.label, color: this.props.settings.accent }}>
                                {item.label}
                            </Text>
                        );
                    })}
                </View>
                {this.state.grid.map(row => {
                    return (
                        <View key={row} style={{ ...styles.columns, height: 45, justifyContent: 'space-between' }} >
                            {row.map(item => {
                                return (
                                    <CalendarDateSelector
                                        day={this.makeDay(item)}
                                        disabled={this.disabled[this.state.grid.indexOf(row)](item)}
                                        key={item}
                                        selected={this.makeDay(item) === this.props.selected}
                                        onPress={(date) => this.props.onPress(date)}
                                    />
                                );
                            })}
                        </View>
                    );
                })}
            </View>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(Calendar);