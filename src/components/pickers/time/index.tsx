import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import Bullet from '../../bullet';
import BaseModal from '../base';
import Display from './display';
import Slider from './slider';

import { TimePickerStyles } from '../styles';

import { ReduxPropType } from '../../../types/redux';

interface DataProps {
    am: boolean,
    hour: number,
    minute: string,
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
                <View style={{ ...TimePickerStyles.root, backgroundColor: this.props.theme.dynamic.screen.bgC }}>
                    <View style={TimePickerStyles.displayRow}>
                        <Display text={this.state.hour.toString()} />
                        <Text style={{ ...TimePickerStyles.colon, color: this.props.theme.dynamic.text.mainC }}>
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
                    <Slider
                        max={12}
                        min={1}
                        onValueChange={(hour: number) => this.setState({ hour })}
                        step={1}
                        text={'hour'.toUpperCase()}
                        value={this.state.hour}
                    />
                    <Slider
                        max={55}
                        min={0}
                        onValueChange={(minute: number) => this.setState({ minute: `0${minute}`.slice(-2) })}
                        step={5}
                        text={'minute'.toUpperCase()}
                        value={parseInt(this.state.minute)}
                    />
                    <View style={TimePickerStyles.bullet}>
                        <Bullet
                            onPress={() => this.props.onSelect(`${this.props.hour}:${this.props.minute} ${this.props.am ? 'AM' : 'PM'}`)}
                            text='confirm'
                            width={0.7}
                        />
                    </View>
                </View>
            </BaseModal>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    theme: state.theme,
});

export default connect(mapStateToProps)(Picker);
