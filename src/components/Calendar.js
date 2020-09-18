import moment from 'moment';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CalendarDateSelector from './CalendarDateSelector';
import ExpandButton from './ExpandButton';
import { calendarStyles, styles } from '../styles';

const longMonths = [1, 3, 5, 7, 8, 10, 12];
const shortMonths = [4, 6, 9, 11];

export default class Calendar extends React.Component {

    constructor(props) {
        super(props);
        const pos = moment().format('YYYY-MM-DD');
        const month = parseInt(pos.substring(5, 7));
        const year = parseInt(pos.substring(0, 4));
        this.state = {
            month: month,
            grid: this.updateRows(month, year),
            pos: pos,
            selectedRow: '',
            year: year,
        }
        this.days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        this.disabled = [this.disabledTop, () => false, () => false, this.disabledBottom, this.disabledBottom, this.disabledBottom];  
    }

    componentDidMount() {
        this.updateRows(this.state.month, this.state.year);
    }

    addZero = num => {
        return num < 10 ? '0' + num : num;
    }

    create2DArray = (rows, columns) => {
        var arr = new Array(rows);
        for (var i = 0; i < rows; i++) {
            arr[i] = new Array(columns);
        }
        return arr;
    }

    disabledTop = (num) => {
        return num > 7
    }

    disabledBottom = (num) => {
        return num < 7
    }

    findMonthSize = (year, month) => {
        if (longMonths.includes(month))
            return 31;
        else if (shortMonths.includes(month))
            return 30;
        else if (this.isLeapYear(year))
            return 29;
        else
            return 28;
    }

    isLeapYear = yearStr => {
        const year = parseInt(yearStr);
        return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
    }

    labelStyle = (color) => {
        return { ...calendarStyles.label, color: color }
    }

    makeDay = date => {
        return this.state.year + '-' + this.addZero(this.state.month) + '-' + this.addZero(date);
    }

    selectedDay = (row, date) => {
        this.setState({
            selectedDay: date,
            selectedRow: row
        });
        this.props.onPress(date);
    }
    
    titleStyle = () => {
        return this.props.dark ? calendarStyles.titleD : calendarStyles.titleL;
    }

    updateRows = (month, year) => {
        const preMonthDayLeft = moment(year + '-' + this.addZero(month) + '-01').weekday();
        const prevMonth = month === 1 ? 12 : month - 1;
        const prevMonthDay = this.findMonthSize(prevMonth === 12 ? year - 1 : year, prevMonth);;
        const currMonthDay = this.findMonthSize(year, month);

        var monthTbl = this.create2DArray(6, 7);

        var i, row, column, rowMax;

        rowMax = Math.floor((preMonthDayLeft + currMonthDay + 6) / 7);
        for (i = 0; i < rowMax * 7; i++) {
            row = Math.floor(i / 7);
            column = i % 7;
            if (row == 0 && i < preMonthDayLeft)
                monthTbl[row][column] = prevMonthDay - (preMonthDayLeft - 1 - i);
            else if (i < preMonthDayLeft + currMonthDay)
                monthTbl[row][column] = i - preMonthDayLeft + 1;
            else
                monthTbl[row][column] = i - (preMonthDayLeft + currMonthDay) + 1;
        }

        return monthTbl
    }

    render() {
        return (
            <View style={calendarStyles.container}>
                <View style={{ ...styles.columns, minHeight: 20, justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        onPress={() => {
                            if (!(this.state.year === 1970 && this.state.month === 1)) {
                                const newMonth = (this.state.month + 11) % 12 === 0 ? 12 : (this.state.month + 11) % 12;
                                const newYear = newMonth === 12 ? this.state.year - 1 : this.state.year;
                                this.setState({
                                    grid: this.updateRows(newMonth, newYear),
                                    month: newMonth,
                                    year: newYear,
                                });
                            }
                        }}
                    >
                        <Icon name={'menu-left-outline'} size={25} color={this.props.accent} />
                    </TouchableOpacity>
                    <Text style={this.titleStyle()}>{moment().month(this.state.month - 1).format('MMMM') + ' ' + this.state.year}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            const newMonth = (this.state.month + 1) % 12 === 0 ? 12 : (this.state.month + 1) % 12;
                            const newYear = newMonth === 1 ? this.state.year + 1 : this.state.year;
                            this.setState({
                                grid: this.updateRows(newMonth, newYear),
                                month: newMonth,
                                year: newYear,
                            });
                        }}
                    >
                        <Icon name={'menu-right-outline'} size={25} color={this.props.accent} />
                    </TouchableOpacity>
                </View>
                <View style={{ ...styles.columns, minHeight: 20, justifyContent: 'space-between' }} >
                    {this.days.map(item => {
                        return (
                            <Text style={this.labelStyle(this.props.accent)}>{item}</Text>
                        )
                    })}
                </View>
                {this.state.grid.map(row => {
                    return (
                        <View style={{ ...styles.columns, minHeight: 20, justifyContent: 'space-between' }} >
                            {row.map(item => {
                                return (
                                    <CalendarDateSelector
                                        dark={this.props.dark}
                                        accent={this.props.accent}
                                        day={this.makeDay(item)}
                                        disabled={this.disabled[this.state.grid.indexOf(row)](item)}
                                        key={item}
                                        onPress={(date) => this.props.onPress(date)}
                                    />
                                )
                            })}
                        </View>
                    )
                })}
            </View>
        );
    }
}