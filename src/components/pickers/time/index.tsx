import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import BaseModal from '../base';
import Display from './display';

import { TimePickerStyles } from '../styles';

import { ReduxPropType } from '../../../types/redux';

interface DataProps {
    am: boolean,
    hour: number,
    minute: number,
    onClose: () => void,
    onSelect: (time: string) => void,
    open: boolean,
}

class Picker extends React.Component<ReduxPropType & DataProps> {

    state = {
        am: this.props.am,
        hour: this.props.hour,
        minute: this.props.minute,
    }

    onClose = () => {
        this.setState({
            am: this.props.am,
            hour: this.props.hour,
            minute: this.props.minute,
        });
        this.props.onClose();
    }

    render() {
        return (
            <BaseModal open={this.props.open} onClose={this.onClose}>
                <View style={{ ...TimePickerStyles.root, backgroundColor: this.props.settings.theme.dynamic.screen.bgC }}>
                    <View style={TimePickerStyles.displayRow}>
                        <Display text={this.state.hour.toString()} />
                        <Text style={{ ...TimePickerStyles.colon, color: this.props.settings.theme.dynamic.text.mainC }}>
                            :
                        </Text>
                        <Display text={this.state.minute.toString()} />
                        <Text style={{ ...TimePickerStyles.colon, color: 'transparent' }}>
                            :
                        </Text>
                        <Display
                            highlight
                            onPress={() => this.setState({ am: !this.state.am })}
                            text={this.state.am ? 'AM' : 'PM'}
                        />
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
