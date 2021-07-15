import moment from 'moment';
import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';

import Numpad from '../numpad';
import DatePicker from '../pickers/date';
import MultiPicker from '../pickers/multi';
import ModalBase from './base';
import Selector from './selector';

import { InputModalStyles } from './styles';

import { CategoryType } from '../../types/data';
import { ReduxPropType } from '../../types/redux';

interface DataProps {
    category: CategoryType,
    date: string,
    onClose: () => void,
    onConfirm: (obj: any) => void,
    open: boolean,
    title: string,
}

class Modal extends React.Component<ReduxPropType & DataProps> {

    state = {
        category: this.props.category,
        date: this.props.date,
        dpOpen: false,
        msOpen: false,
        title: this.props.title,
    }

    onConfirm = (value: number) => {
        console.log({
            value,
            date: this.state.date,
            title: this.state.title,
            category: this.state.category,
        });
    }

    render() {
        return (
            <>
                <ModalBase onClose={this.props.onClose} open={this.props.open}>
                    <View style={{ ...InputModalStyles.inputBox, backgroundColor: this.props.settings.theme.dynamic.screen.secondaryBgC }}>
                        <TextInput
                            onChangeText={(title: string) => this.setState({ title })}
                            placeholder='Title (Optional) ...'
                            placeholderTextColor={this.props.settings.theme.dynamic.text.secondaryC}
                            style={{ ...InputModalStyles.textInput, color: this.props.settings.theme.dynamic.text.mainC }}
                            value={this.state.title}
                        />
                    </View>
                    <Selector
                        icon={this.props.category.icon}
                        label='Category'
                        onPress={() => this.setState({ dpOpen: true })}
                        text={this.props.category.name}
                    />
                    <Selector
                        icon='calendar-month'
                        label='Date'
                        onPress={() => this.setState({ dpOpen: true })}
                        text={this.state.date}
                    />
                    <Numpad onConfirm={this.onConfirm} />
                </ModalBase>
                <DatePicker
                    onClose={() => this.setState({ dpOpen: false })}
                    onSelect={(date: string) => this.setState({ date, dpOpen: false })}
                    open={this.state.dpOpen}
                    selected={this.state.date}
                />
            </>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    settings: state.settings,
});

export default connect(mapStateToProps)(Modal);
