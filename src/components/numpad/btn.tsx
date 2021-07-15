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
        let color: string = this.props.theme.dynamic.text.mainC;
        if (this.props.disabled)
            color = this.props.theme.dynamic.text.secondaryC;

        if (this.props.highlight)
            color = this.props.theme.static.accentC;

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
    theme: state.theme,
});

export default connect(mapStateToProps)(Btn);
