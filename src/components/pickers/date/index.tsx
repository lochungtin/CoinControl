import Calendar from '@enigmaoffline/calendarjs';
import moment from 'moment';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import BaseModal from '../base';
import Cell from './cell';

import { DatePickerStyles } from '../styles';

import { ReduxPropType } from '../../../types/redux';
import { smallKeygen } from '../../../utils/keygen';

interface DataProps {
    onClose: () => void,
    onSelect: (date: string) => void,
    open: boolean,
    selected: string,
}

class Picker extends React.Component<ReduxPropType & DataProps> {

    state = {
        trigger: false,
    }

    calendar = new Calendar(moment().get('year'), moment().get('month') + 1);

    prev = () => {
        this.calendar.prevMonth();
        this.setState({ trigger: !this.state.trigger });
    }

    next = () => {
        this.calendar.nextMonth();
        this.setState({ trigger: !this.state.trigger });
    }

    render() {
        return (
            <BaseModal open={this.props.open} onClose={this.props.onClose}>
                <View style={{ ...DatePickerStyles.root, backgroundColor: this.props.settings.theme.dynamic.screen.bgC }}>
                    <View style={DatePickerStyles.controllerRow}>
                        <TouchableOpacity onPress={this.prev}>
                            <Icon
                                color={this.props.settings.theme.dynamic.icon.mainC}
                                name='chevron-left'
                                size={30}
                            />
                        </TouchableOpacity>
                        <Text style={{ ...DatePickerStyles.label, color: this.props.settings.theme.dynamic.text.mainC }}>
                            {`${[
                                'JANUARY',
                                'FEBRUARY',
                                'MARCH',
                                'APRIL',
                                'MAY',
                                'JUNE',
                                'JULY',
                                'AUGUST',
                                'SEPTEMBER',
                                'OCTOBER',
                                'NOVEMBER',
                                'DECEMBER'
                            ][this.calendar.month - 1]} ${this.calendar.year}`}
                        </Text>
                        <TouchableOpacity onPress={this.next}>
                            <Icon
                                color={this.props.settings.theme.dynamic.icon.mainC}
                                name='chevron-right'
                                size={30}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ ...DatePickerStyles.dateRow, backgroundColor: this.props.settings.theme.dynamic.screen.secondaryBgC }}>
                        <View key={smallKeygen()} style={DatePickerStyles.row}>
                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((date: string) => {
                                return (
                                    <Cell
                                        data={date}
                                        key={smallKeygen()}
                                        special={true}
                                    />
                                );
                            })}
                        </View>
                    </View>
                    <View style={DatePickerStyles.grid}>
                        {this.calendar.getGrid().map((row: Array<string>) => {
                            return (
                                <View key={smallKeygen()} style={DatePickerStyles.row}>
                                    {row.map((date: string) => {
                                        return (
                                            <Cell
                                                data={date}
                                                disabled={this.calendar.month !== parseInt(date.substring(3, 5))}
                                                highlight={this.props.selected === date}
                                                key={smallKeygen()}
                                                onPress={() => this.props.onSelect(date)}
                                                special={moment().format('DD-MM-YYYY') === date}
                                            />
                                        );
                                    })}
                                </View>
                            );
                        })}
                    </View>
                </View>
            </BaseModal>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    settings: state.settings,
});

export default connect(mapStateToProps)(Picker);
