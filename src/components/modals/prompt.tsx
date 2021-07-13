import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Bullet from '../bullet';
import ModalBase from './base';

import { PromptModalStyles } from './styles';

import { ReduxPropType } from '../../types/redux';

interface DataProps {
    onClose: () => void,
    onConfirm: () => void,
    open: boolean,
}

class Modal extends React.Component<ReduxPropType & DataProps> {

    state = {
        checked: false,
    }

    render() {
        return (
            <ModalBase onClose={this.props.onClose} open={this.props.open}>
                <View style={{ ...PromptModalStyles.root, backgroundColor: this.props.settings.theme.dynamic.screen.bgC }}>
                    <View style={PromptModalStyles.content}>
                        <Icon
                            color={this.props.settings.theme.static.accentC}
                            name='alert-circle-outline'
                            size={60}
                        />
                        <View style={PromptModalStyles.textbox}>
                            <View style={PromptModalStyles.warningTextBox}>
                                <Text style={{ ...PromptModalStyles.warningText, color: this.props.settings.theme.dynamic.text.mainC }}>
                                    WARNING
                                </Text>
                            </View>
                            <View style={PromptModalStyles.promptTextBox}>
                                <Text style={{ ...PromptModalStyles.promptText, color: this.props.settings.theme.dynamic.text.mainC }}>
                                    You are about to commit a warn crime, are you sure you want to proceed?
                                </Text>
                            </View>
                            <View style={PromptModalStyles.dnsaTextBox}>
                                <Text style={{ ...PromptModalStyles.dnsaText, color: this.props.settings.theme.dynamic.text.mainC }}>
                                    Don't show again
                                </Text>
                                <TouchableOpacity onPress={() => this.setState({ checked: !this.state.checked })}>
                                    <Icon
                                        color={this.props.settings.theme.static.accentC}
                                        name={this.state.checked ? 'checkbox-marked-outline' : 'checkbox-blank-outline'}
                                        size={30}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={PromptModalStyles.bullets}>
                        <Bullet 
                            onPress={() => {}}
                            text='confirm'
                            width={0.375}
                        />
                        <Bullet 
                            inactive
                            onPress={() => {}}
                            text='cancel'
                            width={0.375}
                        />
                    </View>
                </View>
            </ModalBase>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    settings: state.settings,
});

export default connect(mapStateToProps)(Modal);
