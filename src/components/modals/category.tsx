import React from 'react';
import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import ColorPicker from '../pickers/color';
import ModalBase from './base';

import { CategoryModalStyles, GeneralModalStyles } from './styles';

import { CategoryType } from '../../types/data';
import { ReduxPropType } from '../../types/redux';

interface DataProps {
    category: CategoryType,
    onClose: () => void,
    onConfirm: (category: CategoryType) => void,
    open: boolean,
}

class Modal extends React.Component<ReduxPropType & DataProps> {

    state = {
        color: this.props.category.color,
        cpOpen: false,
        name: this.props.category.name,
    }

    onClose = () => {
        this.setState({
            color: this.props.category.color,
            name: this.props.category.name,
        });
        this.props.onClose();
    }

    onConfirm = () => this.props.onConfirm({
        color: this.state.color,
        icon: this.props.category.icon,
        key: this.props.category.key,
        name: this.state.name,
    });

    render() {
        return (
            <>
                <ModalBase onClose={this.onClose} open={this.props.open}>
                    <KeyboardAvoidingView
                        behavior='padding'
                        keyboardVerticalOffset={-200}
                        style={GeneralModalStyles.root}
                    >
                        <View style={{ ...CategoryModalStyles.rowContainer, backgroundColor: this.props.theme.dynamic.screen.secondaryBgC }}>
                            <View style={CategoryModalStyles.row}>
                                <View style={{ ...CategoryModalStyles.icon, backgroundColor: this.state.color }}>
                                    <Icon
                                        color={this.props.theme.dynamic.text.mainC}
                                        name={this.props.category.icon}
                                        size={35}
                                    />
                                </View>
                                <TextInput
                                    onChangeText={(name: string) => this.setState({ name })}
                                    placeholder='Category Name'
                                    placeholderTextColor={this.props.theme.dynamic.text.secondaryC}
                                    style={{ ...CategoryModalStyles.textInput, color: this.props.theme.dynamic.text.mainC }}
                                    value={this.state.name}
                                />
                                <TouchableOpacity onPress={this.onConfirm}>
                                    <Icon
                                        color={this.props.theme.dynamic.icon.mainC}
                                        name='checkbox-marked-circle-outline'
                                        size={35}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={CategoryModalStyles.row}>
                            <Text style={{ ...CategoryModalStyles.label, color: this.props.theme.dynamic.text.labelC }}>
                                COLOR:
                            </Text>
                            <TouchableOpacity onPress={() => this.setState({ cpOpen: true })} style={{ ...CategoryModalStyles.colorBullet, backgroundColor: this.state.color }} />
                        </View>
                    </KeyboardAvoidingView>
                </ModalBase>
                <ColorPicker
                    onClose={() => this.setState({ cpOpen: false })}
                    onSelect={(color: string) => this.setState({ color, cpOpen: false })}
                    open={this.state.cpOpen}
                    selected={this.state.color}
                />
            </>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    theme: state.theme,
});

export default connect(mapStateToProps)(Modal);
