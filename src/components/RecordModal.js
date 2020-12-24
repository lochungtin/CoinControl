import React from 'react';
import { TextInput, View } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import ExpandButton from './ExpandButton';
import Numpad from './Numpad';
import { black, iconColors, recordModalStyles, styles, white, } from '../styles';

class RecordModal extends React.Component {

    constructor() {
        super();
        this.state = {
            editTitle: false,
            newDate: '',
            newTitle: '',
        }
    }

    close = () => {
        this.setState({ editTitle: false });
        this.props.close();
    }

    iconColor = () => {
        return this.props.settings.darkMode ? white : black;
    }

    onChangeDate = date => this.setState({ newDate: date });

    onConfirm = num => {
        var rec = { ...this.props.item };

        if (rec.value !== num)
            rec.value = parseInt(num);
        if (rec.date !== this.state.newDate && this.state.newDate !== '')
            rec.date = this.state.newDate;
        if (rec.title !== this.state.newTitle)
            rec.title = this.state.newTitle;

        this.props.onConfirm(rec);
    }

    style = (stylesheet, styleName) => {
        return stylesheet[styleName + (this.props.settings.darkMode ? "D" : "L")];
    }

    render() {
        return (
            <Modal
                animationIn={'slideInUp'}
                backdropOpacity={0}
                isVisible={this.props.open}
                onBackdropPress={this.close}
                onBackButtonPress={this.close}
                onSwipeComplete={this.close}
                swipeDirection='down'
                style={{ flexDirection: 'row', alignItems: 'flex-end', padding: 0, margin: 0 }}
            >
                <View style={styles.rows}>
                    <View style={this.style(recordModalStyles, 'header')}>
                        <ExpandButton color={this.iconColor()} onPress={this.close} />
                    </View>
                    <View style={this.style(recordModalStyles, 'inputBox')}>
                        <Icon name={this.props.item.icon} color={this.props.settings.accent} size={30} />
                        <TextInput
                            onChangeText={text => this.setState({ newTitle: text, editTitle: true })}
                            placeholder={'Title (Optional)'}
                            placeholderTextColor={this.style(iconColors, 'icon')}
                            style={this.style(recordModalStyles, 'input')}
                            value={this.state.editTitle ? this.state.newTitle : this.props.item.title}
                        />
                    </View>
                    <Numpad
                        onChangeDate={this.onChangeDate}
                        onConfirm={this.onConfirm}
                        date={this.props.item.date}
                        num={this.props.item.value === undefined ? '0' : this.props.item.value}
                    />
                </View>
            </Modal>
        )
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(RecordModal);
