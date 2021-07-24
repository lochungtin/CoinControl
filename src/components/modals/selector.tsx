import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import { GeneralModalStyles } from './styles';

import { ReduxThemeType } from '../../types/redux';

interface DataProps {
    icon: string,
    label: string,
    onPress: () => void,
    text: string,
}

class Modal extends React.Component<ReduxThemeType & DataProps> {
    render() {
        return (
            <View style={GeneralModalStyles.selectorRow}>
                <View style={GeneralModalStyles.selectorLeft}>
                    <Icon
                        color={this.props.theme.static.accentC}
                        name={this.props.icon}
                        size={30}
                    />
                    <Text style={{ ...GeneralModalStyles.selectorLabel, color: this.props.theme.dynamic.text.labelC }}>
                        {this.props.label}
                    </Text>
                </View>
                <TouchableOpacity onPress={this.props.onPress} style={{ ...GeneralModalStyles.selectorBtn, borderColor: this.props.theme.static.accentC }}>
                    <Text style={{ ...GeneralModalStyles.selectorText, color: this.props.theme.dynamic.text.mainC }}>
                        {this.props.text}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxThemeType) => ({
    theme: state.theme,
});

export default connect(mapStateToProps)(Modal);
