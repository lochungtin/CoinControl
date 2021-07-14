import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import { NumpadStyles } from './styles';

import { NumpadBtnProps } from '../../types/data';
import { ReduxPropType } from '../../types/redux';

class Btn extends React.Component<ReduxPropType & NumpadBtnProps & { disabled: boolean }> {

    onPress = () => {
        if (!this.props.disabled)
            this.props.onPress();
    }

    render() {
        return (
            <TouchableOpacity onPress={this.onPress} style={NumpadStyles.btn}>
                <Icon
                    color={this.props.disabled ? this.props.settings.theme.dynamic.text.secondaryC : this.props.settings.theme.dynamic.text.mainC}
                    name={this.props.icon}
                    size={50}
                />
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    settings: state.settings,
});

export default connect(mapStateToProps)(Btn);
