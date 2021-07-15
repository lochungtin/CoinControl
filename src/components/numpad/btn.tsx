import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import { NumpadStyles } from './styles';

import { NumpadBtnProps } from '../../types/data';
import { ReduxPropType } from '../../types/redux';

interface NumpadControlProps {
    disabled: boolean,
    highlight: boolean,
}

class Btn extends React.Component<ReduxPropType & NumpadBtnProps & NumpadControlProps> {

    onPress = () => {
        if (!this.props.disabled)
            this.props.onPress();
    }

    render() {
        let color: string = this.props.settings.theme.dynamic.text.mainC;
        if (this.props.disabled)
            color = this.props.settings.theme.dynamic.text.secondaryC;

        if (this.props.highlight)
            color = this.props.settings.theme.static.accentC;

        return (
            <TouchableOpacity onPress={this.onPress} style={NumpadStyles.btn}>
                <Icon
                    color={color}
                    name={this.props.icon}
                    size={40}
                />
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    settings: state.settings,
});

export default connect(mapStateToProps)(Btn);
