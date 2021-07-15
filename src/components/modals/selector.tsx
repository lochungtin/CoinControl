import React, { ReactElement } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Numpad from '../numpad';
import ModalBase from './base';

import { GeneralModalStyles, InputModalStyles } from './styles';

import { ReduxPropType } from '../../types/redux';

interface DataProps {
    icon: string,
    label: string,
    onPress: () => void,
    text: string,
}

class Modal extends React.Component<ReduxPropType & DataProps> {
    render() {
        return (
            <View style={GeneralModalStyles.selectorRow}>
                <View style={GeneralModalStyles.selectorLeft}>
                    <Icon
                        color={this.props.settings.theme.static.accentC}
                        name={this.props.icon}
                        size={30}
                    />
                    <Text style={{ ...GeneralModalStyles.selectorLabel, color: this.props.settings.theme.dynamic.text.labelC }}>
                        {this.props.label}
                    </Text>
                </View>
                <TouchableOpacity onPress={this.props.onPress} style={{ ...GeneralModalStyles.selectorBtn, borderColor: this.props.settings.theme.static.accentC }}>
                    <Text style={{ ...GeneralModalStyles.selectorText, color: this.props.settings.theme.dynamic.text.mainC }}>
                        {this.props.text}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    settings: state.settings,
});

export default connect(mapStateToProps)(Modal);
