import React from 'react';
import { Switch, Text, TouchableOpacity, View, } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import ExpandButton from '../ExpandButton';
import { updateSettings } from '../../redux/action';
import { store } from '../../redux/store';

import { black, shade2, white, } from '../../data/color';
import { generalBottomModalStyles, confirmationModalStyles, styles, } from '../../styles';

class ConfirmationModal extends React.Component {

    iconColor = () => this.props.settings.darkMode ? white : black;

    togglePrompt = value => {
        let update = {}
        update[this.props.text.key] = value;
        store.dispatch(updateSettings({ key: 'prompt', update: { ...this.props.settings.prompt, ...update } }));
    }

    style = (stylesheet, styleName) => stylesheet[styleName + (this.props.settings.darkMode ? "D" : "L")];

    render() {
        return (
            <Modal
                animationIn={'slideInUp'}
                isVisible={this.props.open}
                onBackdropPress={this.props.close}
                onBackButtonPress={this.props.close}
                onSwipeComplete={this.props.close}
                style={generalBottomModalStyles.bottomModalContainer}
                swipeDirection='down'
            >
                {this.props.open &&
                    <View style={styles.rows}>
                        <View style={this.style(generalBottomModalStyles, 'header')}>
                            <ExpandButton color={this.iconColor()} onPress={this.props.close} />
                        </View>
                        <View style={this.style(confirmationModalStyles, 'content')}>
                            <Text style={{ ...confirmationModalStyles.title, color: this.props.settings.accent, }}>
                                {this.props.text.title}
                            </Text>
                            <Icon 
                                color={this.iconColor()}
                                name='alert-circle-outline'
                                size={35}
                            />
                        </View>
                        <View style={this.style(confirmationModalStyles, 'content')}>
                            <Text style={this.style(confirmationModalStyles, 'detail')}>
                                {this.props.text.detail}
                            </Text>
                        </View>
                        <View style={this.style(confirmationModalStyles, 'content')}>
                            <Text style={this.style(confirmationModalStyles, 'dsa')}>
                                Don't Show Again
                            </Text>
                            <Switch
                                onValueChange={this.togglePrompt}
                                thumbColor={white}
                                trackColor={{ false: this.iconColor(), true: this.props.settings.accent, }}
                                value={this.props.settings.prompt[this.props.text.key]}
                            />
                        </View>
                        <View style={this.style(confirmationModalStyles, 'content')}>
                            <TouchableOpacity onPress={this.props.close} style={{ ...styles.roundView, backgroundColor: shade2, }}>
                                <Text>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.props.onConfirm} style={{ ...styles.roundView, backgroundColor: this.props.settings.accent, width: '55%', }}>
                                <Text style={styles.centerTextL}>
                                    Confirm
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(ConfirmationModal);
