import Calendar from '@enigmaoffline/calendarjs';
import moment from 'moment';
import React from 'react';
import { View } from 'react-native';
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

    cl: Calendar = new Calendar(2021, 7);

    render() {
        console.log(this.cl);
        return (
            <BaseModal open={this.props.open} onClose={this.props.onClose}>
                <View style={{ ...DatePickerStyles.root, backgroundColor: this.props.settings.theme.dynamic.screen.bgC }}>
                    {this.cl.getGrid().map((row: Array<string>) => {
                        return (
                            <View style={DatePickerStyles.row}>
                                {row.map((date: string) => {
                                    return (
                                        <Cell
                                            data={date}
                                            highlight={this.props.selected === date}
                                            key={smallKeygen()}
                                            onPress={this.props.onSelect}
                                        />
                                    );
                                })}
                            </View>
                        );
                    })}
                </View>
            </BaseModal>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    settings: state.settings,
});

export default connect(mapStateToProps)(Picker);
