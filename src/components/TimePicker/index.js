import React from 'react';
import { Switch, Text, View, } from 'react-native'
import Modal from 'react-native-modal';
import { connect } from 'react-redux';

import Clock from './Clock';
import ExpandButton from '../ExpandButton';

import { shade2, shade3, white } from '../../data/color';
import { pickerModalStyles, styles, timePickerStyles } from '../../styles';

class TimePicker extends React.Component {

    constructor(props) {
        super(props);
        let splt = props.time.split(':');

        this.state = {
            clickCounter: 0,
            hourSelected: splt[0],
            minSelected: splt[1],
            pm: parseInt(splt[0]) > 12,
        };

        this.data = [
            ['12', '11', '1', '10', '2', '9', '3', '8', '4', '7', '5', '6'],
            ['00', '55', '05', '50', '10', '45', '15', '40', '20', '35', '25', '30'],
        ];
    }

    close = () => {
        this.props.close();
        let splt = this.props.time.split(':');
        this.setState({ clickCounter: 0, hourSelected: splt[0], minSelected: splt[1], pm: parseInt(splt[0]) > 12, });
    }    

    onPress = num => {
        if (this.state.clickCounter === 0)
            this.setState({ clickCounter: 1, hourSelected: num, });
        else {
            this.props.onPress(this.state.hourSelected + ':' + num);
            this.setState({ clickCounter: 0, minSelected: num, });
        }
    }

    style = (stylesheet, styleName) => stylesheet[styleName + (this.props.settings.darkMode ? "D" : "L")];

    toggleAmPm = () => this.setState({ pm: !this.state.pm });

    trackColor = () => this.props.settings.darkMode ? shade2 : shade3;

    render() {
        return (
            <Modal
                animationIn={'slideInUp'}
                isVisible={this.props.open}
                onBackdropPress={this.close}
                onBackButtonPress={this.close}
                onSwipeComplete={this.close}
                style={{ alignItems: 'center', padding: 0, margin: 0, }}
                swipeDirection='down'
            >
                <View style={{ ...this.style(pickerModalStyles, 'root'), height: 350, }}>
                    <ExpandButton onPress={this.close} />
                    <Clock
                        data={this.data[this.state.clickCounter]}
                        dim={200}
                        hr={this.state.clickCounter === 0}
                        offset={40}
                        onPress={this.onPress}
                        pm={this.state.pm}
                        selected={this.state.clickCounter === 0 ? this.state.hourSelected : this.state.minSelected}
                    >
                        <Text style={{ fontSize: 40, fontWeight: 'bold', color: this.props.settings.accent, }}>
                            {this.state.hourSelected + ' : ' + this.state.minSelected}
                        </Text>
                    </Clock>
                    <View style={{ ...styles.columns, maxHeight: 30, }}>
                        <Text style={this.style(timePickerStyles, 'amText')}>
                            {'AM  '}
                        </Text>
                        <Switch
                            onChange={this.toggleAmPm}
                            thumbColor={white}
                            trackColor={{ false: this.trackColor(), true: this.props.settings.accent, }}
                            value={this.state.pm}
                        />
                        <Text style={this.style(timePickerStyles, 'amText')}>
                            {'  PM'}
                        </Text>
                    </View>
                </View>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(TimePicker);