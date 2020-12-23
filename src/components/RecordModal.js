import moment from 'moment';
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import DatePicker from '../components/DatePicker';
import ExpandButton from './ExpandButton';
import Numpad from './Numpad';
import { black, maxHeight, recordModalStyles, styles, white, } from '../styles';

class RecordModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: props.date,
        }
    }

    close = () => {
        this.props.close();
    }

    render() {
        return (
            <Modal 
                animationIn={'slideInUp'}
                isVisible={this.props.open} 
                onBackdropPress={this.close}
                onBackButtonPress={this.close}
                style={{flexDirection: 'row', alignItems: 'flex-end', padding: 0, margin: 0}}
            >
                <View style={styles.rows}>
                    <ExpandButton color={white} onPress={this.close} />
                    <View style={recordModalStyles.box}>
                        
                    </View>
                    <View style={recordModalStyles.box}>
                        
                    </View>
                    <Numpad />
                </View>
            </Modal>
        )
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(RecordModal);

