import moment from 'moment';
import React from 'react';
import { Text, View } from 'react-native';

import CalendarDateSelector from './CalendarDateSelector';
import ExpandButton from './ExpandButton';
import { calendarStyles, styles } from '../styles';

const longMonths = [1, 3, 5, 7, 8, 10, 12];
const shortMonths = [4, 6, 9, 11];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default class Calendar extends React.Component {

    constructor(props) {
        super(props);

        const pos = moment().format('YYYY-MM-DD');
        const month = parseInt(pos.substring(5, 7));
        const year = parseInt(pos.substring(0, 4));
        const grid = this.updateRows(month, year);
        this.state = {
            month: month,
            pos: pos,
            row1: grid[0],
            row2: grid[1],
            row3: grid[2],
            row4: grid[3],
            row5: grid[4],
            row6: grid[5],
            selectedDay: '',
            selectedRow: '',
            year: year,
        }
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

    updateRows = (month, year) => {
        const preMonthDayLeft = moment(year + '-' + this.addZero(month) + '-01').day();
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

        return monthTbl;
    }

    updateState = grid => {
        this.setState({
            row1: grid[0],
            row2: grid[1],
            row3: grid[2],
            row4: grid[3],
            row5: grid[4],
            row6: grid[5],
        })
    }

    render() {
        return (
            <View style={{ ...calendarStyles.container, minHeight: this.state.selectedDay === '' ? 375 : 150 }}>
                <View style={{...styles.columns, justifyContent: 'space-between'}}>
                    <Text style={calendarStyles.title}>{months[this.state.month - 1] + ' ' + this.state.year}</Text>
                </View>
                <View style={{...styles.columns, justifyContent: 'space-between'}} >
                    <Text style={{ ...styles.centerText, color: this.props.accent, fontSize: this.props.size, width: 30 }}>{days[0]}</Text>
                    <Text style={{ ...styles.centerText, color: this.props.accent, fontSize: this.props.size, width: 30 }}>{days[1]}</Text>
                    <Text style={{ ...styles.centerText, color: this.props.accent, fontSize: this.props.size, width: 30 }}>{days[2]}</Text>
                    <Text style={{ ...styles.centerText, color: this.props.accent, fontSize: this.props.size, width: 30 }}>{days[3]}</Text>
                    <Text style={{ ...styles.centerText, color: this.props.accent, fontSize: this.props.size, width: 30 }}>{days[4]}</Text>
                    <Text style={{ ...styles.centerText, color: this.props.accent, fontSize: this.props.size, width: 30 }}>{days[5]}</Text>
                    <Text style={{ ...styles.centerText, color: this.props.accent, fontSize: this.props.size, width: 30 }}>{days[6]}</Text>
                </View>
                {(this.state.selectedDay === '' || this.state.selectedRow === 1) &&
                    <View style={{...styles.columns, justifyContent: 'space-between'}} >
                        <CalendarDateSelector dots={this.props.data} color={this.props.accent} day={this.makeDay(this.state.row1[0])} onPress={(date) => this.selectedDay(1, date)}  disabled={this.state.row1[0] > 7} />
                        <CalendarDateSelector dots={this.props.data} color={this.props.accent} day={this.makeDay(this.state.row1[1])} onPress={(date) => this.selectedDay(1, date)}  disabled={this.state.row1[1] > 7} />
                        <CalendarDateSelector dots={this.props.data} color={this.props.accent} day={this.makeDay(this.state.row1[2])} onPress={(date) => this.selectedDay(1, date)}  disabled={this.state.row1[2] > 7} />
                        <CalendarDateSelector dots={this.props.data} color={this.props.accent} day={this.makeDay(this.state.row1[3])} onPress={(date) => this.selectedDay(1, date)}  disabled={this.state.row1[3] > 7} />
                        <CalendarDateSelector dots={this.props.data} color={this.props.accent} day={this.makeDay(this.state.row1[4])} onPress={(date) => this.selectedDay(1, date)}  disabled={this.state.row1[4] > 7} />
                        <CalendarDateSelector dots={this.props.data} color={this.props.accent} day={this.makeDay(this.state.row1[5])} onPress={(date) => this.selectedDay(1, date)}  disabled={this.state.row1[5] > 7} />
                        <CalendarDateSelector dots={this.props.data} color={this.props.accent} day={this.makeDay(this.state.row1[6])} onPress={(date) => this.selectedDay(1, date)}  disabled={this.state.row1[6] > 7} />
                    </View>
                }
                {(this.state.selectedDay === '' || this.state.selectedRow === 2) &&
                    <View style={{...styles.columns, justifyContent: 'space-between'}} >
                        <CalendarDateSelector dots={this.props.data} color={this.props.accent} day={this.makeDay(this.state.row2[0])} onPress={(date) => this.selectedDay(2, date)}  />
                        <CalendarDateSelector dots={this.props.data} color={this.props.accent} day={this.makeDay(this.state.row2[1])} onPress={(date) => this.selectedDay(2, date)}  />
                        <CalendarDateSelector dots={this.props.data} color={this.props.accent} day={this.makeDay(this.state.row2[2])} onPress={(date) => this.selectedDay(2, date)}  />
                        <CalendarDateSelector dots={this.props.data} color={this.props.accent} day={this.makeDay(this.state.row2[3])} onPress={(date) => this.selectedDay(2, date)}  />
                        <CalendarDateSelector dots={this.props.data} color={this.props.accent} day={this.makeDay(this.state.row2[4])} onPress={(date) => this.selectedDay(2, date)}  />
                        <CalendarDateSelector dots={this.props.data} color={this.props.accent} day={this.makeDay(this.state.row2[5])} onPress={(date) => this.selectedDay(2, date)}  />
                        <CalendarDateSelector dots={this.props.data} color={this.props.accent} day={this.makeDay(this.state.row2[6])} onPress={(date) => this.selectedDay(2, date)}  />
                    </View>
                }
                {(this.state.selectedDay === '' || this.state.selectedRow === 3) &&
                    <View style={{...styles.columns, justifyContent: 'space-between'}} >
                        <CalendarDateSelector dots={this.props.data} color={this.props.accent} day={this.makeDay(this.state.row3[0])} onPress={(date) => this.selectedDay(3, date)}  />
                        <CalendarDateSelector dots={this.props.data} color={this.props.accent} day={this.makeDay(this.state.row3[1])} onPress={(date) => this.selectedDay(3, date)}  />
                        <CalendarDateSelector dots={this.props.data} color={this.props.accent} day={this.makeDay(this.state.row3[2])} onPress={(date) => this.selectedDay(3, date)}  />
                        <CalendarDateSelector dots={this.props.data} color={this.props.accent} day={this.makeDay(this.state.row3[3])} onPress={(date) => this.selectedDay(3, date)}  />
                        <CalendarDateSelector dots={this.props.data} color={this.props.accent} day={this.makeDay(this.state.row3[4])} onPress={(date) => this.selectedDay(3, date)}  />
                        <CalendarDateSelector dots={this.props.data} color={this.props.accent} day={this.makeDay(this.state.row3[5])} onPress={(date) => this.selectedDay(3, date)}  />
                        <CalendarDateSelector dots={this.props.data} color={this.props.accent} day={this.makeDay(this.state.row3[6])} onPress={(date) => this.selectedDay(3, date)}  />
                    </View>
                }
                {(this.state.selectedDay === '' || this.state.selectedRow === 4) &&
                    <View style={{...styles.columns, justifyContent: 'space-between'}} >
                        <CalendarDateSelector dots={this.props.data} color={this.props.accent} day={this.makeDay(this.state.row4[0])} onPress={(date) => this.selectedDay(4, date)}  />
                        <CalendarDateSelector dots={this.props.data} color={this.props.accent} day={this.makeDay(this.state.row4[1])} onPress={(date) => this.selectedDay(4, date)}  />
                        <CalendarDateSelector dots={this.props.data} color={this.props.accent} day={this.makeDay(this.state.row4[2])} onPress={(date) => this.selectedDay(4, date)}  />
                        <CalendarDateSelector dots={this.props.data} color={this.props.accent} day={this.makeDay(this.state.row4[3])} onPress={(date) => this.selectedDay(4, date)}  />
                        <CalendarDateSelector dots={this.props.data} color={this.props.accent} day={this.makeDay(this.state.row4[4])} onPress={(date) => this.selectedDay(4, date)}  />
                        <CalendarDateSelector dots={this.props.data} color={this.props.accent} day={this.makeDay(this.state.row4[5])} onPress={(date) => this.selectedDay(4, date)}  />
                        <CalendarDateSelector dots={this.props.data} color={this.props.accent} day={this.makeDay(this.state.row4[6])} onPress={(date) => this.selectedDay(4, date)}  />
                    </View>
                }
                {(this.state.selectedDay === '' || this.state.selectedRow === 5) &&
                    <View style={{...styles.columns, justifyContent: 'space-between'}} >
                        <CalendarDateSelector dots={this.props.data} color={this.props.accent} day={this.makeDay(this.state.row5[0])} onPress={(date) => this.selectedDay(5, date)}  disabled={this.state.row5[0] < 7} />
                        <CalendarDateSelector dots={this.props.data} color={this.props.accent} day={this.makeDay(this.state.row5[1])} onPress={(date) => this.selectedDay(5, date)}  disabled={this.state.row5[1] < 7} />
                        <CalendarDateSelector dots={this.props.data} color={this.props.accent} day={this.makeDay(this.state.row5[2])} onPress={(date) => this.selectedDay(5, date)}  disabled={this.state.row5[2] < 7} />
                        <CalendarDateSelector dots={this.props.data} color={this.props.accent} day={this.makeDay(this.state.row5[3])} onPress={(date) => this.selectedDay(5, date)}  disabled={this.state.row5[3] < 7} />
                        <CalendarDateSelector dots={this.props.data} color={this.props.accent} day={this.makeDay(this.state.row5[4])} onPress={(date) => this.selectedDay(5, date)}  disabled={this.state.row5[4] < 7} />
                        <CalendarDateSelector dots={this.props.data} color={this.props.accent} day={this.makeDay(this.state.row5[5])} onPress={(date) => this.selectedDay(5, date)}  disabled={this.state.row5[5] < 7} />
                        <CalendarDateSelector dots={this.props.data} color={this.props.accent} day={this.makeDay(this.state.row5[6])} onPress={(date) => this.selectedDay(5, date)}  disabled={this.state.row5[6] < 7} />
                    </View>
                }
                {(this.state.selectedDay === '' || this.state.selectedRow === 6) &&
                    <>
                        {
                            this.state.row6[6] < 7 ? (
                                <View style={{...styles.columns, justifyContent: 'space-between'}} >
                                    <CalendarDateSelector dots={this.props.data} color={this.props.accent} day={this.makeDay(this.state.row6[0])} onPress={(date) => this.selectedDay(6, date)}  disabled={this.state.row6[0] < 7} />
                                    <CalendarDateSelector dots={this.props.data} color={this.props.accent} day={this.makeDay(this.state.row6[1])} onPress={(date) => this.selectedDay(6, date)}  disabled={this.state.row6[1] < 7} />
                                    <CalendarDateSelector dots={this.props.data} color={this.props.accent} day={this.makeDay(this.state.row6[2])} onPress={(date) => this.selectedDay(6, date)}  disabled={this.state.row6[2] < 7} />
                                    <CalendarDateSelector dots={this.props.data} color={this.props.accent} day={this.makeDay(this.state.row6[3])} onPress={(date) => this.selectedDay(6, date)}  disabled={this.state.row6[3] < 7} />
                                    <CalendarDateSelector dots={this.props.data} color={this.props.accent} day={this.makeDay(this.state.row6[4])} onPress={(date) => this.selectedDay(6, date)}  disabled={this.state.row6[4] < 7} />
                                    <CalendarDateSelector dots={this.props.data} color={this.props.accent} day={this.makeDay(this.state.row6[5])} onPress={(date) => this.selectedDay(6, date)}  disabled={this.state.row6[5] < 7} />
                                    <CalendarDateSelector dots={this.props.data} color={this.props.accent} day={this.makeDay(this.state.row6[6])} onPress={(date) => this.selectedDay(6, date)}  disabled={this.state.row6[6] < 7} />
                                </View>) : (
                                    <View style={{...styles.columns, justifyContent: 'space-between'}} />
                                )
                        }
                    </>
                }
                {this.state.selectedDay !== '' &&
                    <View style={{...styles.columns, justifyContent: 'space-between'}}>
                        <View />
                        <ExpandButton onPress={() => {
                            this.setState({ selectedDay: '', selectedRow: '' });
                            this.props.onReExtend();
                        }} />
                        <View />
                    </View>
                }
            </View>
        );
    }
}