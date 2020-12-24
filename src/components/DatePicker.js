import React from 'react'
import { Text, TouchableOpacity, View, } from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';

import Calendar from './Calendar';
import ExpandButton from './ExpandButton';
import { datePickerStyles, styles, } from '../styles';

class DatePicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: this.props.date,
        }
    }

    modalStyle = () => {
        return this.props.settings.darkMode ? datePickerStyles.modalViewD : datePickerStyles.modalViewL;
    }

    render() {
        return (
            <Modal
                animationIn={'slideInUp'}
                isVisible={this.props.open}
                onBackdropPress={this.props.close}
                onBackButtonPress={this.props.close}
            >
                <View style={this.modalStyle()}>
                    <ExpandButton onPress={this.props.close} />
                    <Calendar
                        data={[]}
                        onPress={(date) => {
                            this.props.action(date);
                            this.props.close();
                        }}
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