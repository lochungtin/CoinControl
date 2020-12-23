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
            open: false,
        }
    }

    close = () => {
        this.setState({ open: false })
    }

    modalStyle = () => {
        return this.props.settings.darkMode ? datePickerStyles.modalViewD : datePickerStyles.modalViewL;
    }

    render() {
        return (
            <View>
                <Modal 
                    animationIn={'slideInUp'}
                    isVisible={this.state.open} 
                    onBackdropPress={this.close}
                    onBackButtonPress={this.close}
                >
                    <View style={this.modalStyle()}>
                        <ExpandButton onPress={() => this.setState({ open: false })} />
                        <Calendar
                            data={[]}
                            onPress={(date) => {
                                this.props.action(date);
                                this.setState({ date: date, open: false });
                            }}
                        />
                    </View>
                </Modal>
                <View style={{ ...styles.columns, justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: this.props.fontSize }}>{this.state.date}</Text>
                    <TouchableOpacity
                        onPress={() => this.setState({ open: true })}
                        style={{ ...datePickerStyles.editBtn, backgroundColor: this.props.settings.accent }}
                    >
                        <Text style={styles.centerTextL}>Edit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(DatePicker);