import moment from 'moment';
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import DatePicker from '../components/DatePicker';
import ExpandButton from './ExpandButton';
import Numpad from './Numpad';
import { black, iconColors, recordModalStyles, styles, white, } from '../styles';

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

    style = (stylesheet, styleName) => {
        return stylesheet[styleName + (this.props.settings.darkMode ? "D" : "L")];
    }

    iconColor = () => {
        return this.props.settings.darkMode ? white : black;
    }

    render() {
        return (
            <Modal
                animationIn={'slideInUp'}
                isVisible={this.props.open}
                onBackdropPress={this.close}
                onBackButtonPress={this.close}
                style={{ flexDirection: 'row', alignItems: 'flex-end', padding: 0, margin: 0 }}
            >
                <View style={styles.rows}>
                    <View style={this.style(recordModalStyles, 'header')}>
                        <ExpandButton color={this.iconColor()} onPress={this.close} />
                    </View>
                    <View style={this.style(recordModalStyles, 'inputBox')}>
                        <Icon name={this.props.item.icon} color={this.props.settings.accent} size={30} />
                        <TextInput 
                            placeholder={'Title (Optional)'}
                            placeholderTextColor={this.style(iconColors, 'icon')} 
                            style={this.style(recordModalStyles, 'input')}
                        />
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

