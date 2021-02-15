import React from 'react'
import { View } from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';

import Calendar from '../Calendar';
import ExpandButton from '../ExpandButton';

import { datePickerStyles } from '../../styles';

class DatePicker extends React.Component {

    modalStyle = () => this.props.settings.darkMode ? datePickerStyles.modalViewD : datePickerStyles.modalViewL;

    onPress = date => {
        this.props.action(date);
        this.props.close();
    }

    render() {
        return (
            <Modal
                animationIn={'slideInUp'}
                isVisible={this.props.open}
                onBackdropPress={this.props.close}
                onBackButtonPress={this.props.close}
                onSwipeComplete={this.close}
                swipeDirection='down'
            >
                <View style={this.modalStyle()}>
                    <ExpandButton onPress={this.props.close} />
                    <Calendar
                        date={this.props.date}
                        onPress={this.onPress}
                        selected={this.props.selected}
                    />
                </View>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(DatePicker);